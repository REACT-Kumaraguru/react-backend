/** Field projects — public GET; admin POST/PUT/DELETE. Card content in `card_data` JSONB. */

function requireAdmin(req, res, next) {
  if (req.session?.admin === true) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

function buildProjectCardData(b) {
  return {
    title: String(b.title || '').trim(),
    tagline: String(b.tagline || '').trim(),
    who: String(b.who || '').trim(),
    duration: String(b.duration || '').trim(),
    format: String(b.format || '').trim(),
    description: String(b.description || '').trim(),
    brief: String(b.brief || '').trim(),
    briefIdea: String(b.briefIdea || b.brief_idea || '').trim(),
    ctaLabel: String(b.ctaLabel || b.cta_label || '').trim() || 'Read the idea',
    postedDate: String(b.postedDate || b.posted_date || '').trim() || 'LATEST OUTCOME',
    imageUrl: String(b.imageUrl || b.imgageUrl || '').trim(),
  };
}

export function normalizeFieldProject(row) {
  if (!row) return null;
  const cd = row.card_data && typeof row.card_data === 'object' ? row.card_data : {};
  return {
    id: row.id,
    sort_order: row.sort_order ?? 0,
    title: cd.title || '',
    tagline: cd.tagline || '',
    who: cd.who || '',
    duration: cd.duration || '',
    format: cd.format || '',
    description: cd.description || '',
    brief: cd.brief || '',
    briefIdea: cd.briefIdea || cd.brief_idea || '',
    ctaLabel: cd.ctaLabel || cd.cta_label || 'Read the idea',
    postedDate: cd.postedDate || cd.posted_date || 'LATEST OUTCOME',
    imageUrl: cd.imageUrl || cd.imgageUrl || '',
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export function registerProjectsRoutes(app, pool) {
  app.get('/api/projects', async (_req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM field_projects ORDER BY sort_order ASC, id ASC`,
      );
      return res.json(rows.map(normalizeFieldProject));
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not load projects' });
    }
  });

  app.get('/api/projects/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const { rows } = await pool.query(`SELECT * FROM field_projects WHERE id = $1`, [id]);
      if (!rows.length) return res.status(404).json({ error: 'Not found' });
      return res.json(normalizeFieldProject(rows[0]));
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not load project' });
    }
  });

  app.post('/api/projects', requireAdmin, async (req, res) => {
    const b = req.body || {};
    const card = buildProjectCardData(b);
    if (!card.title) return res.status(400).json({ error: 'Title is required' });
    const sort_order = Number.isFinite(Number(b.sort_order)) ? parseInt(b.sort_order, 10) : 0;
    try {
      const { rows } = await pool.query(
        `INSERT INTO field_projects (sort_order, card_data, updated_at) VALUES ($1, $2::jsonb, NOW()) RETURNING *`,
        [sort_order, JSON.stringify(card)],
      );
      return res.status(201).json(normalizeFieldProject(rows[0]));
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not create project' });
    }
  });

  app.put('/api/projects/:id', requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    const b = req.body || {};
    try {
      const { rows: existing } = await pool.query(`SELECT * FROM field_projects WHERE id = $1`, [id]);
      if (!existing.length) return res.status(404).json({ error: 'Not found' });
      const prev = normalizeFieldProject(existing[0]);
      const merged = { ...prev, ...b, id: prev.id };
      const card = buildProjectCardData(merged);
      if (!card.title) return res.status(400).json({ error: 'Title is required' });
      const sort_order =
        b.sort_order !== undefined && Number.isFinite(Number(b.sort_order))
          ? parseInt(b.sort_order, 10)
          : existing[0].sort_order ?? 0;
      const { rows } = await pool.query(
        `UPDATE field_projects SET sort_order = $1, card_data = $2::jsonb, updated_at = NOW() WHERE id = $3 RETURNING *`,
        [sort_order, JSON.stringify(card), id],
      );
      return res.json(normalizeFieldProject(rows[0]));
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not update project' });
    }
  });

  app.delete('/api/projects/:id', requireAdmin, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const { rowCount } = await pool.query(`DELETE FROM field_projects WHERE id = $1`, [id]);
      if (!rowCount) return res.status(404).json({ error: 'Not found' });
      return res.status(204).send();
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not delete project' });
    }
  });
}
