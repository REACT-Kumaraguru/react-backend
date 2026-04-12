/** Programmes — public GET; admin POST/PUT/DELETE. Flexible card_data JSON + category + theme + slug + formFields. */

function requireAdmin(req, res, next) {
  if (req.session?.admin === true) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

export function normalizeSlug(input) {
  return String(input || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

function normalizeInfo(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((x) => ({
      label: String(x?.label ?? '').trim(),
      value: String(x?.value ?? '').trim(),
    }))
    .filter((x) => x.label && x.value);
}

function normalizeFeatures(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map((s) => String(s).trim()).filter(Boolean);
}

function normalizeFormFieldType(t) {
  const s = String(t ?? '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '');
  if (['para', 'paragraph', 'multiline', 'textarea', 'longtext'].includes(s)) return 'para';
  if (['email', 'e-mail', 'mail'].includes(s)) return 'email';
  if (['number', 'numeric', 'integer', 'float', 'decimal'].includes(s)) return 'number';
  return 'text';
}

function normalizeAccentHex(input) {
  const s = String(input || '').trim();
  if (/^#[0-9A-Fa-f]{6}$/.test(s)) return s.toLowerCase();
  if (/^#[0-9A-Fa-f]{3}$/.test(s)) {
    const r = s[1],
      g = s[2],
      b = s[3];
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return '';
}

function normalizeFormFields(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((x, idx) => {
      const type = normalizeFormFieldType(x?.type);
      return {
        id: String(x?.id || `f_${idx}`).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64) || `f_${idx}`,
        name: String(x?.name ?? '').trim().slice(0, 200),
        type,
        required: !!x?.required,
        numberAllowDecimals: type === 'number' ? !!x?.numberAllowDecimals : false,
      };
    })
    .filter((x) => x.name);
}

function buildCardData(b) {
  const accentRaw = normalizeAccentHex(b.accentColor);
  return {
    title: String(b.title || '').trim(),
    tagline: String(b.tagline || '').trim(),
    shortDescription: String(b.shortDescription || '').trim(),
    longDescription: String(b.longDescription || '').trim(),
    info: normalizeInfo(b.info),
    features: normalizeFeatures(b.features),
    eligibility: String(b.eligibility || '').trim(),
    buttonText: String(b.buttonText || '').trim() || 'Learn more',
    buttonLink: String(b.buttonLink || '').trim(),
    formFields: normalizeFormFields(b.formFields),
    accentColor: accentRaw || undefined,
  };
}

/** Map DB row to API shape (supports card_data + legacy columns). */
export function normalizeProgramme(row) {
  if (!row) return null;
  const base = {
    id: row.id,
    slug: row.slug ? String(row.slug).trim() : '',
    category: row.category || null,
    theme: row.theme === 'purple' ? 'purple' : 'orange',
    sort_order: row.sort_order ?? 0,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };

  const cd =
    row.card_data && typeof row.card_data === 'object' && Object.keys(row.card_data).length
      ? row.card_data
      : null;

  if (cd && (cd.title || cd.tagline || cd.shortDescription)) {
    const accent = normalizeAccentHex(cd.accentColor);
    return {
      ...base,
      title: cd.title || '',
      tagline: cd.tagline || '',
      shortDescription: cd.shortDescription || '',
      longDescription: cd.longDescription || '',
      info: Array.isArray(cd.info) ? normalizeInfo(cd.info) : [],
      features: Array.isArray(cd.features) ? normalizeFeatures(cd.features) : [],
      eligibility: cd.eligibility || '',
      buttonText: cd.buttonText || 'Learn more',
      buttonLink: cd.buttonLink || '',
      formFields: normalizeFormFields(cd.formFields),
      accentColor: accent || (base.theme === 'purple' ? '#a855f7' : '#f97316'),
    };
  }

  const meta = Array.isArray(row.meta_stats) ? row.meta_stats : [];
  const bullets = Array.isArray(row.bullets) ? row.bullets : [];
  const legacyInfo =
    meta.length > 0
      ? normalizeInfo(meta)
      : [
          ...(row.duration ? [{ label: 'Duration', value: String(row.duration) }] : []),
          ...(row.format ? [{ label: 'Format', value: String(row.format) }] : []),
        ];

  const legacyAccent = row.accent_color && String(row.accent_color).trim() ? String(row.accent_color).trim() : '';
  return {
    ...base,
    title: row.title || '',
    tagline: row.tagline || '',
    shortDescription: row.description ? String(row.description).slice(0, 280) : '',
    longDescription: row.description || '',
    info: legacyInfo,
    features: bullets,
    eligibility: row.footnote || '',
    buttonText: row.cta_label || 'Apply',
    buttonLink: row.link_url || '',
    formFields: [],
    accentColor: normalizeAccentHex(legacyAccent) || (base.theme === 'purple' ? '#a855f7' : '#f97316'),
  };
}

async function assertSlugAvailable(pool, slug, excludeId) {
  if (!slug) return;
  const sql = excludeId
    ? `SELECT id FROM programmes WHERE lower(trim(slug)) = lower($1) AND id <> $2`
    : `SELECT id FROM programmes WHERE lower(trim(slug)) = lower($1)`;
  const args = excludeId ? [slug, excludeId] : [slug];
  const { rows } = await pool.query(sql, args);
  if (rows.length) {
    const err = new Error('SLUG_TAKEN');
    err.code = 'SLUG_TAKEN';
    throw err;
  }
}

export function registerProgrammesRoutes(app, pool) {
  app.get('/api/programmes', async (_req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM programmes ORDER BY sort_order ASC, id ASC`,
      );
      return res.json(rows.map(normalizeProgramme));
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not load programmes' });
    }
  });

  app.get('/api/programmes/slug/:slug', async (req, res) => {
    const slug = normalizeSlug(req.params.slug);
    if (!slug) return res.status(400).json({ error: 'Invalid slug' });
    try {
      const { rows } = await pool.query(`SELECT * FROM programmes WHERE lower(trim(slug)) = lower($1)`, [
        slug,
      ]);
      if (!rows.length) return res.status(404).json({ error: 'Not found' });
      return res.json(normalizeProgramme(rows[0]));
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not load programme' });
    }
  });

  /** Admin: list form submissions for a programme */
  app.get('/api/programmes/:id/submissions', requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const { rows: prog } = await pool.query(`SELECT id FROM programmes WHERE id = $1`, [id]);
      if (!prog.length) return res.status(404).json({ error: 'Programme not found' });
      const { rows } = await pool.query(
        `SELECT id, payload, created_at FROM programme_form_submissions
         WHERE programme_id = $1 ORDER BY created_at DESC`,
        [id],
      );
      const list = rows.map((r) => {
        const p = r.payload && typeof r.payload === 'object' ? r.payload : {};
        return {
          id: r.id,
          created_at: r.created_at,
          answers: p.answers || {},
          fieldMeta: Array.isArray(p.fieldMeta) ? p.fieldMeta : [],
        };
      });
      return res.json(list);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not load submissions' });
    }
  });

  app.get('/api/programmes/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const { rows } = await pool.query(`SELECT * FROM programmes WHERE id = $1`, [id]);
      if (!rows.length) return res.status(404).json({ error: 'Not found' });
      return res.json(normalizeProgramme(rows[0]));
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not load programme' });
    }
  });

  /** Public: submit dynamic programme form */
  app.post('/api/programmes/slug/:slug/submit', async (req, res) => {
    const slug = normalizeSlug(req.params.slug);
    if (!slug) return res.status(400).json({ error: 'Invalid slug' });
    const answers = req.body?.answers;
    if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
      return res.status(400).json({ error: 'answers object required' });
    }
    try {
      const { rows } = await pool.query(`SELECT * FROM programmes WHERE lower(trim(slug)) = lower($1)`, [
        slug,
      ]);
      if (!rows.length) return res.status(404).json({ error: 'Not found' });
      const p = normalizeProgramme(rows[0]);
      const fields = Array.isArray(p.formFields) ? p.formFields : [];
      if (!fields.length) return res.status(400).json({ error: 'This programme has no application form' });

      const missing = fields.filter((f) => f.required && (answers[f.id] === undefined || answers[f.id] === ''));
      if (missing.length) {
        return res.status(400).json({ error: 'Missing required fields', fields: missing.map((m) => m.id) });
      }

      const sanitized = {};
      for (const f of fields) {
        let v = answers[f.id];
        if (v === undefined || v === null) continue;
        if (f.type === 'number') {
          const n = typeof v === 'number' ? v : parseFloat(String(v).replace(',', '.'));
          if (Number.isNaN(n)) {
            return res.status(400).json({ error: `Invalid number for: ${f.name}` });
          }
          if (!f.numberAllowDecimals && !Number.isInteger(n)) {
            return res.status(400).json({ error: `Whole number required for: ${f.name}` });
          }
          sanitized[f.id] = n;
        } else {
          sanitized[f.id] = String(v).trim().slice(0, 20000);
        }
      }

      await pool.query(
        `INSERT INTO programme_form_submissions (programme_id, payload) VALUES ($1, $2::jsonb)`,
        [p.id, JSON.stringify({ answers: sanitized, fieldMeta: fields.map((x) => ({ id: x.id, name: x.name, type: x.type })) })],
      );
      return res.status(201).json({ ok: true });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not submit' });
    }
  });

  app.post('/api/programmes', requireAdmin, async (req, res) => {
    const b = req.body || {};
    const card = buildCardData(b);
    if (!card.title) return res.status(400).json({ error: 'Title is required' });
    if (!card.info.length) return res.status(400).json({ error: 'At least one info field (label + value) is required' });

    const slug = normalizeSlug(b.slug);
    if (!slug) return res.status(400).json({ error: 'URL slug is required (letters, numbers, hyphens)' });

    const category = b.category != null ? String(b.category).trim() : '';
    const theme = b.theme === 'purple' ? 'purple' : 'orange';
    const sort_order = Number.isFinite(Number(b.sort_order)) ? parseInt(b.sort_order, 10) : 0;

    try {
      await assertSlugAvailable(pool, slug, null);
    } catch (e) {
      if (e.code === 'SLUG_TAKEN') return res.status(409).json({ error: 'That URL slug is already in use' });
      throw e;
    }

    try {
      const { rows } = await pool.query(
        `INSERT INTO programmes (
          category, theme, sort_order, card_data, title,
          tagline, description, slug, updated_at
        ) VALUES ($1, $2, $3, $4::jsonb, $5, $6, $7, $8, NOW())
        RETURNING *`,
        [
          category || null,
          theme,
          sort_order,
          JSON.stringify(card),
          card.title,
          card.tagline || null,
          card.longDescription || card.shortDescription || null,
          slug,
        ],
      );
      return res.status(201).json(normalizeProgramme(rows[0]));
    } catch (e) {
      console.error(e);
      if (e.code === '23505') return res.status(409).json({ error: 'That URL slug is already in use' });
      return res.status(500).json({ error: 'Could not create programme' });
    }
  });

  app.put('/api/programmes/:id', requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    const b = req.body || {};

    try {
      const { rows: existing } = await pool.query(`SELECT * FROM programmes WHERE id = $1`, [id]);
      if (!existing.length) return res.status(404).json({ error: 'Not found' });
      const cur = existing[0];
      const prev = normalizeProgramme(cur);
      const merged = { ...prev, ...b, id: cur.id };
      const card = buildCardData(merged);
      if (!card.title) return res.status(400).json({ error: 'Title is required' });
      if (!card.info.length) return res.status(400).json({ error: 'At least one info field (label + value) is required' });

      const slug = normalizeSlug(b.slug !== undefined ? b.slug : prev.slug || cur.slug);
      if (!slug) return res.status(400).json({ error: 'URL slug is required' });

      try {
        await assertSlugAvailable(pool, slug, id);
      } catch (e) {
        if (e.code === 'SLUG_TAKEN') return res.status(409).json({ error: 'That URL slug is already in use' });
        throw e;
      }

      const category = b.category !== undefined ? String(b.category || '').trim() : cur.category || '';
      const theme =
        b.theme !== undefined ? (b.theme === 'purple' ? 'purple' : 'orange') : cur.theme === 'purple' ? 'purple' : 'orange';
      const sort_order =
        b.sort_order !== undefined && Number.isFinite(Number(b.sort_order))
          ? parseInt(b.sort_order, 10)
          : cur.sort_order;

      try {
        const { rows } = await pool.query(
          `UPDATE programmes SET
          category = $1, theme = $2, sort_order = $3, card_data = $4::jsonb,
          title = $5, tagline = $6, description = $7, slug = $8, updated_at = NOW()
        WHERE id = $9
        RETURNING *`,
          [
            category || null,
            theme,
            sort_order,
            JSON.stringify(card),
            card.title,
            card.tagline || null,
            card.longDescription || card.shortDescription || null,
            slug,
            id,
          ],
        );
        return res.json(normalizeProgramme(rows[0]));
      } catch (e) {
        console.error(e);
        if (e.code === '23505') return res.status(409).json({ error: 'That URL slug is already in use' });
        return res.status(500).json({ error: 'Could not update programme' });
      }
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not update programme' });
    }
  });

  app.delete('/api/programmes/:id', requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const { rowCount } = await pool.query(`DELETE FROM programmes WHERE id = $1`, [id]);
      if (!rowCount) return res.status(404).json({ error: 'Not found' });
      return res.status(204).send();
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not delete programme' });
    }
  });
}
