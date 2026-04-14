import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import onHeaders from 'on-headers';
import bcrypt from 'bcryptjs';
import { pool } from './db.js';
import { runMigrations } from './migrate.js';
import { registerOdRoutes } from './odRoutes.js';
import { registerRiskmRoutes } from './riskmRoutes.js';
import { registerProgrammesRoutes } from './programmesRoutes.js';
import { registerProjectsRoutes } from './projectsRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const app = express();
if (process.env.TRUST_PROXY === '1') {
  app.set('trust proxy', 1);
}

/** Set ACCESS_LOG=1 to print one line per request (method, URL, status, duration). */
if (process.env.ACCESS_LOG === '1') {
  app.use((req, res, next) => {
    const started = Date.now();
    res.on('finish', () => {
      const sidCookie = req.headers.cookie?.includes('rw.sid=') ? 'yes' : 'no';
      console.log(
        `${req.method} ${req.originalUrl || req.url} ${res.statusCode} ${Date.now() - started}ms rw.sidCookie=${sidCookie}`,
      );
    });
    next();
  });
}

const PORT = Number(process.env.PORT) || 4000;
const SESSION_SECRET =
  process.env.SESSION_SECRET || process.env.JWT_SECRET || 'dev-secret-change-in-production';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'react@kct.ac.in';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'react@2026';
const BCRYPT_ROUNDS = 10;

/**
 * When SESSION_COOKIE_SECURE=true, use 'auto' so the Secure flag matches TLS as Express sees it
 * (via X-Forwarded-Proto + trust proxy). A plain `true` with a wrong proto makes express-session
 * skip Set-Cookie entirely (browser would never get rw.sid).
 * When false, allow cookies on http:// (e.g. local dev without TLS).
 */
const sessionCookieSecure =
  process.env.SESSION_COOKIE_SECURE === 'true' ? 'auto' : false;

const defaultCorsOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
];
const corsOrigins =
  process.env.CORS_ORIGIN?.split(',')
    .map((o) => o.trim())
    .filter(Boolean) || defaultCorsOrigins;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (corsOrigins.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: '12mb' }));

const PgSessionStore = connectPgSimple(session);
app.use(
  session({
    store: new PgSessionStore({
      pool,
      createTableIfMissing: true,
    }),
    name: 'rw.sid',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: process.env.TRUST_PROXY === '1',
    cookie: {
      httpOnly: true,
      secure: sessionCookieSecure,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  }),
);

const uploadsDir = path.join(rootDir, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = /^image\/(jpeg|png|gif|webp)$/i.test(file.mimetype);
    if (!ok) return cb(new Error('Only image files are allowed'));
    cb(null, true);
  },
});

app.use('/uploads', express.static(uploadsDir));

function requireAdmin(req, res, next) {
  if (req.session?.admin !== true) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
}

/** Only `ADMIN_EMAIL` (e.g. react@kct.ac.in) may manage the registration role list. */
function requirePrimaryAdmin(req, res, next) {
  if (req.session?.admin !== true) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const adminEmail = (req.session.email || '').trim().toLowerCase();
  const allowed = (ADMIN_EMAIL || '').trim().toLowerCase();
  if (adminEmail !== allowed) {
    return res.status(403).json({ error: 'Only the primary React admin can manage registration roles' });
  }
  return next();
}

/** Part before @ — e.g. mohamed@gmail.com → mohamed */
function emailLocalPart(email) {
  const s = String(email).trim().toLowerCase();
  const i = s.indexOf('@');
  return i === -1 ? s : s.slice(0, i);
}

app.get('/api/auth/me', async (req, res) => {
  if (req.session?.admin === true) {
    const em = (req.session.email || '').trim().toLowerCase();
    const allowed = (ADMIN_EMAIL || '').trim().toLowerCase();
    return res.json({
      role: 'admin',
      email: req.session.email || null,
      canManageWorkplaceRoles: em === allowed,
      canManageAdmins: em === allowed,
    });
  }
  const uid = req.session?.userId;
  if (uid) {
    try {
      const { rows } = await pool.query(
        `SELECT a.id, a.email, a.name, a.phone, a.degree, a.grad_year, a.branch, a.dob, a.profile_pic_path, a.created_at,
                wr.name AS workplace_role_name, COALESCE(a.is_active, true) AS is_active
         FROM applications a
         LEFT JOIN workplace_roles wr ON wr.id = a.workplace_role_id
         WHERE a.id = $1 AND a.status = $2`,
        [uid, 'APPROVED'],
      );
      if (rows.length) {
        const r = rows[0];
        if (r.is_active === false) {
          return res.status(401).json({ error: 'Account deactivated' });
        }
        return res.json({
          role: 'user',
          email: r.email,
          name: r.name,
          phone: r.phone,
          degree: r.degree,
          grad_year: r.grad_year,
          branch: r.branch,
          dob: r.dob,
          profile_pic_path: r.profile_pic_path,
          member_since: r.created_at,
          workplace_role_name: r.workplace_role_name || null,
          institution: 'Kumaraguru College of Technology',
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
  return res.status(401).json({ error: 'Unauthorized' });
});

/** Public list for registration form (scrollable select on the client). */
app.get('/api/workplace-roles', async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name FROM workplace_roles ORDER BY sort_order ASC, name ASC`,
    );
    return res.json(rows);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Could not load roles' });
  }
});

app.post('/api/admin/workplace-roles', requirePrimaryAdmin, async (req, res) => {
  const name = (req.body?.name || '').trim();
  if (!name || name.length > 255) {
    return res.status(400).json({ error: 'Valid role name is required' });
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO workplace_roles (name, sort_order)
       SELECT $1, COALESCE((SELECT MAX(sort_order) FROM workplace_roles), 0) + 1
       RETURNING id, name, sort_order`,
      [name],
    );
    return res.status(201).json(rows[0]);
  } catch (e) {
    if (e.code === '23505') {
      return res.status(409).json({ error: 'A role with this name already exists' });
    }
    console.error(e);
    return res.status(500).json({ error: 'Could not create role' });
  }
});

app.delete('/api/admin/workplace-roles/:id', requirePrimaryAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
  try {
    const { rows: usage } = await pool.query(
      `SELECT COUNT(*)::int AS c FROM applications WHERE workplace_role_id = $1`,
      [id],
    );
    if (usage[0].c > 0) {
      return res.status(400).json({ error: 'Cannot delete: applicants use this role' });
    }
    const del = await pool.query(`DELETE FROM workplace_roles WHERE id = $1 RETURNING id`, [id]);
    if (!del.rows.length) return res.status(404).json({ error: 'Not found' });
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Could not delete role' });
  }
});

app.get('/api/admin/accounts', requirePrimaryAdmin, async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, email, created_at FROM admin_accounts ORDER BY created_at ASC`,
    );
    return res.json(rows);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Could not load admin accounts' });
  }
});

app.post('/api/admin/accounts', requirePrimaryAdmin, async (req, res) => {
  const name = (req.body?.name || '').trim();
  const emailIn = (req.body?.email || '').trim().toLowerCase();
  const explicitPwd = (req.body?.password || '').trim();
  if (!name || !emailIn) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const primary = (ADMIN_EMAIL || '').trim().toLowerCase();
  if (emailIn === primary) {
    return res.status(400).json({ error: 'This email is reserved for the primary admin' });
  }
  const pwd = explicitPwd || emailLocalPart(emailIn);
  if (pwd.length < 6) {
    return res.status(400).json({
      error:
        'Password must be at least 6 characters. Enter a password explicitly, or use an email whose part before @ is at least 6 characters.',
    });
  }
  try {
    const hash = await bcrypt.hash(pwd, BCRYPT_ROUNDS);
    const { rows } = await pool.query(
      `INSERT INTO admin_accounts (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at`,
      [name, emailIn, hash],
    );
    return res.status(201).json(rows[0]);
  } catch (e) {
    if (e.code === '23505') {
      return res.status(409).json({ error: 'An admin with this email already exists' });
    }
    console.error(e);
    return res.status(500).json({ error: 'Could not create admin account' });
  }
});

app.delete('/api/admin/accounts/:id', requirePrimaryAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
  try {
    const r = await pool.query(`DELETE FROM admin_accounts WHERE id = $1 RETURNING id`, [id]);
    if (!r.rowCount) return res.status(404).json({ error: 'Not found' });
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Could not delete admin account' });
  }
});

/** Approved users whose birthday is today (month+day); visible to any logged-in workplace user. */
app.get('/api/birthdays-today', async (req, res) => {
  if (!req.session?.admin && !req.session?.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const { rows } = await pool.query(
      `SELECT id, name
       FROM applications
       WHERE status = 'APPROVED'
         AND COALESCE(is_active, true) IS NOT FALSE
         AND dob IS NOT NULL
         AND EXTRACT(MONTH FROM dob::date) = EXTRACT(MONTH FROM CURRENT_DATE)
         AND EXTRACT(DAY FROM dob::date) = EXTRACT(DAY FROM CURRENT_DATE)
       ORDER BY name ASC`,
    );
    return res.json({ birthdays: rows.map((r) => ({ id: r.id, name: r.name })) });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Could not load birthdays' });
  }
});

app.post('/api/auth/change-password', async (req, res) => {
  if (!req.session?.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { currentPassword, newPassword, confirmPassword } = req.body || {};
  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: 'All password fields are required' });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'New passwords do not match' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  try {
    const { rows } = await pool.query(
      'SELECT password_hash FROM applications WHERE id = $1 AND status = $2',
      [req.session.userId, 'APPROVED'],
    );
    if (!rows.length || !rows[0].password_hash) {
      return res.status(400).json({ error: 'Password change unavailable' });
    }
    const match = await bcrypt.compare(currentPassword, rows[0].password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    const hash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    await pool.query('UPDATE applications SET password_hash = $1 WHERE id = $2', [
      hash,
      req.session.userId,
    ]);
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Could not update password' });
  }
});

function finishLoginSession(req, res, payload) {
  req.session.regenerate((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Session error' });
    }
    if (payload.role === 'admin') {
      req.session.admin = true;
      req.session.email = payload.email;
    } else {
      req.session.userId = payload.userId;
      req.session.email = payload.email;
    }
    // Async stores (e.g. connect-pg-simple): ensure session is persisted before
    // the response is sent so Set-Cookie is not skipped or raced.
    req.session.save((saveErr) => {
      if (saveErr) {
        console.error(saveErr);
        return res.status(500).json({ error: 'Session error' });
      }
      // Avoid any intermediary caching a “successful” login body without Set-Cookie.
      res.setHeader('Cache-Control', 'no-store, private');
      if (process.env.ACCESS_LOG === '1') {
        onHeaders(res, () => {
          const sc = res.getHeader('Set-Cookie');
          const present = Boolean(
            sc && (Array.isArray(sc) ? sc.some(Boolean) : String(sc).length > 0),
          );
          console.log(`POST /api/auth/login Set-Cookie=${present ? 'present' : 'MISSING'}`);
        });
      }
      return res.json({ ok: true, role: payload.role });
    });
  });
}

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const emailNorm = email.trim().toLowerCase();

  if (emailNorm === (ADMIN_EMAIL || '').trim().toLowerCase() && password === ADMIN_PASSWORD) {
    return finishLoginSession(req, res, { role: 'admin', email: emailNorm });
  }

  try {
    const { rows: adminRows } = await pool.query(
      `SELECT id, email, password_hash FROM admin_accounts WHERE lower(trim(email)) = $1`,
      [emailNorm],
    );
    if (adminRows.length) {
      const ok = await bcrypt.compare(password, adminRows[0].password_hash);
      if (ok) {
        return finishLoginSession(req, res, { role: 'admin', email: adminRows[0].email });
      }
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Login failed' });
  }

  try {
    const { rows } = await pool.query(
      `SELECT id, password_hash, status, COALESCE(is_active, true) AS is_active FROM applications WHERE email = $1`,
      [emailNorm],
    );
    if (!rows.length || rows[0].status !== 'APPROVED' || !rows[0].password_hash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const ok = await bcrypt.compare(password, rows[0].password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (rows[0].is_active === false) {
      return res.status(403).json({ error: 'Account deactivated. Contact admin.' });
    }
    return finishLoginSession(req, res, {
      role: 'user',
      userId: rows[0].id,
      email: emailNorm,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out' });
    }
    return res.json({ ok: true });
  });
});

app.post('/api/applications', upload.single('profilePic'), async (req, res) => {
  try {
    const { name, email, phone, degree, gradYear, branch, dob, workplaceRoleId } = req.body || {};
    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    if (!phone?.trim()) {
      return res.status(400).json({ error: 'Phone number is required' });
    }
    if (!branch?.trim()) {
      return res.status(400).json({ error: 'Branch is required' });
    }
    if (!dob?.trim()) {
      return res.status(400).json({ error: 'Date of birth is required' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Profile picture is required' });
    }
    const roleId = parseInt(workplaceRoleId, 10);
    if (!Number.isInteger(roleId) || roleId < 1) {
      return res.status(400).json({ error: 'Workplace role is required' });
    }
    const roleOk = await pool.query(`SELECT id FROM workplace_roles WHERE id = $1`, [roleId]);
    if (!roleOk.rows.length) {
      return res.status(400).json({ error: 'Invalid workplace role' });
    }
    const emailNorm = email.trim().toLowerCase();
    const picPath = req.file ? `/uploads/${req.file.filename}` : null;
    const dobVal = dob?.trim() ? dob.trim() : null;

    const result = await pool.query(
      `INSERT INTO applications (profile_pic_path, name, email, phone, degree, grad_year, branch, dob, workplace_role_id, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'PENDING')
       RETURNING id, email`,
      [
        picPath,
        name.trim(),
        emailNorm,
        phone?.trim() || null,
        degree?.trim() || null,
        gradYear ? parseInt(gradYear, 10) : null,
        branch?.trim() || null,
        dobVal,
        roleId,
      ],
    );

    return res.status(201).json({
      id: result.rows[0].id,
      message: 'Your application is under review. Please wait for admin approval.',
    });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'An application with this email already exists' });
    }
    req.file?.path && fs.unlink(req.file.path, () => {});
    console.error('applications insert error:', err);
    const detail =
      process.env.API_VERBOSE_ERRORS === '1' ? String(err.message || err) : undefined;
    return res.status(500).json({
      error: 'Could not save application',
      ...(detail && { detail }),
    });
  }
});

app.get('/api/admin/applications', requireAdmin, async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT a.id, a.profile_pic_path, a.name, a.email, a.phone, a.degree, a.grad_year, a.branch, a.dob, a.status, a.decided_at, a.created_at,
              wr.name AS workplace_role_name, COALESCE(a.is_active, true) AS is_active
       FROM applications a
       LEFT JOIN workplace_roles wr ON wr.id = a.workplace_role_id
       ORDER BY a.created_at DESC`,
    );
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Could not load applications' });
  }
});

app.patch('/api/admin/applications/:id/account-status', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { active, adminPassword } = req.body || {};
  if (!Number.isInteger(id) || typeof active !== 'boolean' || !adminPassword) {
    return res.status(400).json({ error: 'Active flag and admin password are required' });
  }
  if (adminPassword !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid admin password' });
  }
  try {
    const { rows } = await pool.query(
      `UPDATE applications SET is_active = $1 WHERE id = $2 AND status = 'APPROVED' RETURNING id, is_active`,
      [active, id],
    );
    if (!rows.length) {
      return res.status(404).json({ error: 'Not found or not an approved user' });
    }
    return res.json(rows[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Could not update account' });
  }
});

app.patch('/api/admin/applications/:id/status', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { status } = req.body || {};
  if (!Number.isInteger(id) || !['APPROVED', 'REJECTED'].includes(status)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const cur = await client.query(
      `SELECT id, email, status FROM applications WHERE id = $1 FOR UPDATE`,
      [id],
    );
    if (!cur.rows.length) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Not found' });
    }
    if (cur.rows[0].status !== 'PENDING') {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Action already recorded for this application' });
    }

    const email = cur.rows[0].email;
    let generatedPassword = null;
    let passwordHash = null;

    if (status === 'APPROVED') {
      generatedPassword = emailLocalPart(email);
      if (!generatedPassword || generatedPassword.length < 1) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          error:
            'Cannot derive a login password from this email (need text before @). Use a valid email address.',
        });
      }
      passwordHash = await bcrypt.hash(generatedPassword, BCRYPT_ROUNDS);
    }

    const { rows } = await client.query(
      `UPDATE applications
       SET status = $1,
           decided_at = NOW(),
           password_hash = COALESCE($2, password_hash)
       WHERE id = $3 AND status = 'PENDING'
       RETURNING id, status, email`,
      [status, passwordHash, id],
    );

    if (!rows.length) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Action already recorded for this application' });
    }

    if (status === 'APPROVED') {
      try {
        await client.query(`UPDATE applications SET is_active = true WHERE id = $1`, [id]);
      } catch (e) {
        if (e.code !== '42703') throw e;
      }
    }

    await client.query('COMMIT');

    const payload = { ...rows[0] };
    if (status === 'APPROVED' && generatedPassword) {
      payload.generatedPassword = generatedPassword;
    }
    return res.json(payload);
  } catch (err) {
    try {
      await client.query('ROLLBACK');
    } catch {
      /* ignore */
    }
    console.error('PATCH /api/admin/applications/:id/status', err);
    const detail =
      process.env.API_VERBOSE_ERRORS === '1' ? String(err.message || err) : undefined;
    return res.status(500).json({
      error: 'Could not update status',
      ...(detail && { detail }),
    });
  } finally {
    client.release();
  }
});

app.delete('/api/admin/applications/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
  try {
    const cur = await pool.query(`SELECT id, profile_pic_path FROM applications WHERE id = $1`, [id]);
    if (!cur.rows.length) return res.status(404).json({ error: 'Not found' });
    const pic = cur.rows[0].profile_pic_path;
    await pool.query(`DELETE FROM applications WHERE id = $1`, [id]);
    if (pic && typeof pic === 'string') {
      const m = pic.match(/^\/uploads\/(.+)$/);
      if (m) {
        const full = path.join(uploadsDir, path.basename(m[1]));
        if (full.startsWith(uploadsDir)) {
          try {
            fs.unlinkSync(full);
          } catch {
            /* ignore missing file */
          }
        }
      }
    }
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Could not delete application' });
  }
});

registerOdRoutes(app, pool);
registerRiskmRoutes(app, pool);
registerProgrammesRoutes(app, pool);
registerProjectsRoutes(app, pool);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use((err, _req, res, _next) => {
  if (err?.message === 'Only image files are allowed') {
    return res.status(400).json({ error: err.message });
  }
  if (err?.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File too large (max 5MB)' });
  }
  console.error(err);
  return res.status(500).json({ error: 'Server error' });
});

(async () => {
  try {
    await runMigrations();
  } catch (e) {
    console.error('Migration failed (continuing if DB unavailable):', e.message || e);
  }
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API listening on ${PORT}`);
  });
})();
