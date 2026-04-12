import { buildOdLetterHtml, listWorkingDates, formatHoursForLetter } from './odLetter.js';
import { renderHtmlToPdf } from './odLetterPdf.js';

function requireUser(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
}

function sanitizeWeekHours(wh, scheduleType, fromDate, toDate, excludeSundays) {
  if (scheduleType === 'FULL_DAY') {
    return {};
  }
  if (!wh || typeof wh !== 'object') return {};
  const out = {};
  const dates = listWorkingDates(
    String(fromDate).slice(0, 10),
    String(toDate).slice(0, 10),
    excludeSundays !== false,
  );
  for (const d of dates) {
    if (wh[d] && Array.isArray(wh[d])) {
      out[d] = [...new Set(wh[d].map((n) => parseInt(n, 10)).filter((n) => n >= 1 && n <= 7))].sort(
        (a, b) => a - b,
      );
    }
  }
  return out;
}

export function registerOdRoutes(app, pool) {
  app.get('/api/od/submissions', requireUser, async (req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM od_submissions WHERE application_id = $1 ORDER BY updated_at DESC`,
        [req.session.userId],
      );
      return res.json(rows);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not load submissions' });
    }
  });

  app.get('/api/admin/od/submissions', async (req, res, next) => {
    if (req.session?.admin !== true) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  }, async (req, res) => {
    try {
      const status = req.query.status;
      const dateFrom = req.query.dateFrom ? String(req.query.dateFrom).slice(0, 10) : '';
      const dateTo = req.query.dateTo ? String(req.query.dateTo).slice(0, 10) : '';
      const search = (req.query.q || '').trim();

      let sql = `SELECT o.*, a.name AS applicant_name, a.email AS applicant_email
        FROM od_submissions o
        JOIN applications a ON a.id = o.application_id
        WHERE o.status <> 'DRAFT'`;
      const params = [];
      let p = 1;

      if (status && ['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
        params.push(status);
        sql += ` AND o.status = $${p++}`;
      }

      if (dateFrom) {
        params.push(dateFrom);
        sql += ` AND COALESCE(o.sent_at::date, o.updated_at::date, o.created_at::date) >= $${p++}::date`;
      }
      if (dateTo) {
        params.push(dateTo);
        sql += ` AND COALESCE(o.sent_at::date, o.updated_at::date, o.created_at::date) <= $${p++}::date`;
      }

      if (search) {
        const like = `%${search}%`;
        params.push(like);
        sql += ` AND (o.subject ILIKE $${p} OR o.student_name ILIKE $${p} OR a.name ILIKE $${p} OR a.email ILIKE $${p})`;
        p += 1;
      }

      sql += ` ORDER BY o.updated_at DESC`;
      const { rows } = await pool.query(sql, params);
      return res.json(rows);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not load OD submissions' });
    }
  });

  app.get('/api/admin/od/active-users-count', async (req, res, next) => {
    if (req.session?.admin !== true) return res.status(401).json({ error: 'Unauthorized' });
    next();
  }, async (_req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT COUNT(*)::int AS c FROM applications WHERE status = 'APPROVED' AND is_active IS NOT FALSE`,
      );
      return res.json({ count: rows[0].c });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not count' });
    }
  });

  app.get('/api/od/submissions/:id/letter', requireUser, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const { rows } = await pool.query(
        `SELECT * FROM od_submissions WHERE id = $1 AND application_id = $2`,
        [id, req.session.userId],
      );
      if (!rows.length) return res.status(404).json({ error: 'Not found' });
      const html = buildOdLetterHtml(rows[0]);
      if (req.query.format === 'html') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.send(html);
      }
      const pdf = await renderHtmlToPdf(html);
      const safeName = `on-duty-letter-${id}.pdf`;
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${safeName}"`);
      return res.send(pdf);
    } catch (e) {
      console.error(e);
      const msg = e?.message || '';
      if (msg.includes('PDF requires Chromium')) {
        return res.status(503).json({ error: msg });
      }
      return res.status(500).json({ error: 'Could not render letter' });
    }
  });

  app.get('/api/od/submissions/:id', requireUser, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const { rows } = await pool.query(
        `SELECT * FROM od_submissions WHERE id = $1 AND application_id = $2`,
        [id, req.session.userId],
      );
      if (!rows.length) return res.status(404).json({ error: 'Not found' });
      return res.json(rows[0]);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not load' });
    }
  });

  app.get('/api/admin/od/submissions/:id/letter', async (req, res, next) => {
    if (req.session?.admin !== true) return res.status(401).json({ error: 'Unauthorized' });
    next();
  }, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const { rows } = await pool.query(`SELECT * FROM od_submissions WHERE id = $1`, [id]);
      if (!rows.length) return res.status(404).json({ error: 'Not found' });
      const html = buildOdLetterHtml(rows[0]);
      if (req.query.format === 'html') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.send(html);
      }
      const pdf = await renderHtmlToPdf(html);
      const safeName = `on-duty-letter-${id}.pdf`;
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${safeName}"`);
      return res.send(pdf);
    } catch (e) {
      console.error(e);
      const msg = e?.message || '';
      if (msg.includes('PDF requires Chromium')) {
        return res.status(503).json({ error: msg });
      }
      return res.status(500).json({ error: 'Could not render letter' });
    }
  });

  app.post('/api/od/submissions', requireUser, async (req, res) => {
    try {
      const b = req.body || {};
      const weekHours = sanitizeWeekHours(
        b.week_hours,
        b.schedule_type || 'ONLY_CLASS',
        b.from_date,
        b.to_date,
        b.exclude_sundays,
      );
      const { rows } = await pool.query(
        `INSERT INTO od_submissions (
          application_id, subject, salutation, student_name, register_number, department_year,
          od_category, from_date, to_date, schedule_type, exclude_sundays, week_hours,
          description_1, description_2, status, updated_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13,$14,'DRAFT',NOW())
        RETURNING *`,
        [
          req.session.userId,
          (b.subject || '').trim(),
          b.salutation === 'Sir' ? 'Sir' : 'Madam',
          (b.student_name || '').trim(),
          (b.register_number || '').trim() || null,
          (b.department_year || '').trim() || null,
          b.od_category === 'ON_DUTY' ? 'ON_DUTY' : 'SPECIAL_ON_DUTY',
          b.from_date,
          b.to_date,
          b.schedule_type === 'FULL_DAY' ? 'FULL_DAY' : 'ONLY_CLASS',
          b.exclude_sundays !== false,
          JSON.stringify(weekHours),
          (b.description_1 || '').trim() || null,
          (b.description_2 || '').trim() || null,
        ],
      );
      return res.status(201).json(rows[0]);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not create submission' });
    }
  });

  app.patch('/api/od/submissions/:id', requireUser, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const cur = await pool.query(
        `SELECT id, status FROM od_submissions WHERE id = $1 AND application_id = $2`,
        [id, req.session.userId],
      );
      if (!cur.rows.length) return res.status(404).json({ error: 'Not found' });
      if (cur.rows[0].status !== 'DRAFT') {
        return res.status(400).json({ error: 'Only draft submissions can be edited' });
      }
      const b = req.body || {};
      const weekHours = sanitizeWeekHours(
        b.week_hours,
        b.schedule_type || 'ONLY_CLASS',
        b.from_date,
        b.to_date,
        b.exclude_sundays,
      );
      const { rows } = await pool.query(
        `UPDATE od_submissions SET
          subject = $1, salutation = $2, student_name = $3, register_number = $4, department_year = $5,
          od_category = $6, from_date = $7, to_date = $8, schedule_type = $9, exclude_sundays = $10,
          week_hours = $11::jsonb, description_1 = $12, description_2 = $13, updated_at = NOW()
        WHERE id = $14 AND application_id = $15 AND status = 'DRAFT'
        RETURNING *`,
        [
          (b.subject || '').trim(),
          b.salutation === 'Sir' ? 'Sir' : 'Madam',
          (b.student_name || '').trim(),
          (b.register_number || '').trim() || null,
          (b.department_year || '').trim() || null,
          b.od_category === 'ON_DUTY' ? 'ON_DUTY' : 'SPECIAL_ON_DUTY',
          b.from_date,
          b.to_date,
          b.schedule_type === 'FULL_DAY' ? 'FULL_DAY' : 'ONLY_CLASS',
          b.exclude_sundays !== false,
          JSON.stringify(weekHours),
          (b.description_1 || '').trim() || null,
          (b.description_2 || '').trim() || null,
          id,
          req.session.userId,
        ],
      );
      if (!rows.length) return res.status(400).json({ error: 'Update failed' });
      return res.json(rows[0]);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not update' });
    }
  });

  app.post('/api/od/submissions/:id/submit', requireUser, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const cur = await pool.query(
        `SELECT * FROM od_submissions WHERE id = $1 AND application_id = $2`,
        [id, req.session.userId],
      );
      if (!cur.rows.length) return res.status(404).json({ error: 'Not found' });
      if (cur.rows[0].status !== 'DRAFT') {
        return res.status(400).json({ error: 'Only drafts can be submitted' });
      }
      const row = cur.rows[0];
      if (!row.subject?.trim() || !row.student_name?.trim()) {
        return res.status(400).json({ error: 'Subject and student name are required before sending' });
      }
      if (row.schedule_type === 'ONLY_CLASS') {
        const wh = row.week_hours || {};
        let n = 0;
        for (const k of Object.keys(wh)) {
          if (Array.isArray(wh[k])) n += wh[k].length;
        }
        if (n === 0) {
          return res.status(400).json({
            error: 'Select class hours or switch to Full day before sending',
          });
        }
      }
      const { rows } = await pool.query(
        `UPDATE od_submissions SET status = 'PENDING', sent_at = NOW(), updated_at = NOW()
         WHERE id = $1 AND application_id = $2 AND status = 'DRAFT'
         RETURNING *`,
        [id, req.session.userId],
      );
      if (!rows.length) return res.status(400).json({ error: 'Submit failed' });
      return res.json(rows[0]);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not submit' });
    }
  });

  app.patch('/api/admin/od/submissions/:id', async (req, res, next) => {
    if (req.session?.admin !== true) return res.status(401).json({ error: 'Unauthorized' });
    next();
  }, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { status, admin_notes } = req.body || {};
    if (!Number.isInteger(id) || !['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    try {
      const cur = await pool.query(`SELECT id, status FROM od_submissions WHERE id = $1`, [id]);
      if (!cur.rows.length) return res.status(404).json({ error: 'Not found' });
      if (cur.rows[0].status !== 'PENDING') {
        return res.status(400).json({ error: 'Action already recorded for this OD request' });
      }
      const { rows } = await pool.query(
        `UPDATE od_submissions SET status = $1, admin_notes = $2, decided_at = NOW(), updated_at = NOW()
         WHERE id = $3 AND status = 'PENDING'
         RETURNING *`,
        [status, (admin_notes || '').trim() || null, id],
      );
      if (!rows.length) return res.status(400).json({ error: 'Update failed' });
      return res.json(rows[0]);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not update' });
    }
  });

  app.delete('/api/admin/od/submissions/:id', async (req, res, next) => {
    if (req.session?.admin !== true) return res.status(401).json({ error: 'Unauthorized' });
    next();
  }, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const r = await pool.query(`DELETE FROM od_submissions WHERE id = $1 RETURNING id`, [id]);
      if (!r.rowCount) return res.status(404).json({ error: 'Not found' });
      return res.json({ ok: true });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not delete submission' });
    }
  });
}
