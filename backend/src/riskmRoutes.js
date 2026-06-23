/** RiskM — risk assessment submissions (session: workplace user or admin). */

function requireApprovedUser(req, res, next) {
  if (req.session?.userId) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

export function registerRiskmRoutes(app, pool) {
  app.post('/api/riskm/submissions', requireApprovedUser, async (req, res) => {
    const payload = req.body?.payload;
    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'payload required' });
    }
    const s1 = payload.step1 || {};
    const projectTitle = String(s1.projectTitle || '').trim();
    const teamName = String(s1.teamName || '').trim();
    if (!projectTitle || !teamName) {
      return res.status(400).json({ error: 'Project title and team name are required' });
    }
    try {
      const { rows } = await pool.query(
        `INSERT INTO riskm_submissions (application_id, project_title, team_name, status, payload)
         VALUES ($1, $2, $3, 'PENDING', $4::jsonb)
         RETURNING id, project_title, team_name, status, payload, created_at, updated_at`,
        [req.session.userId, projectTitle, teamName, JSON.stringify(payload)],
      );
      return res.status(201).json(rows[0]);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not save submission' });
    }
  });

  app.get('/api/riskm/submissions', async (req, res) => {
    if (req.session?.admin === true) {
      try {
        const { rows } = await pool.query(
          `SELECT r.id, r.project_title, r.team_name, r.status, r.created_at, r.updated_at,
                  a.name AS applicant_name, a.email AS applicant_email
           FROM riskm_submissions r
           JOIN applications a ON a.id = r.application_id
           ORDER BY r.updated_at DESC`,
        );
        return res.json(rows);
      } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Could not load submissions' });
      }
    }
    if (!req.session?.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const { rows } = await pool.query(
        `SELECT id, project_title, team_name, status, payload, created_at, updated_at
         FROM riskm_submissions WHERE application_id = $1 ORDER BY updated_at DESC`,
        [req.session.userId],
      );
      return res.json(rows);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not load submissions' });
    }
  });

  app.get('/api/riskm/submissions/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const { rows } = await pool.query(
        `SELECT r.*, a.name AS applicant_name, a.email AS applicant_email, a.phone AS applicant_phone
         FROM riskm_submissions r
         JOIN applications a ON a.id = r.application_id
         WHERE r.id = $1`,
        [id],
      );
      if (!rows.length) return res.status(404).json({ error: 'Not found' });
      const row = rows[0];
      if (req.session?.admin === true) {
        return res.json(row);
      }
      if (req.session?.userId && row.application_id === req.session.userId) {
        return res.json(row);
      }
      return res.status(403).json({ error: 'Forbidden' });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not load submission' });
    }
  });

  app.patch('/api/riskm/submissions/:id/approve', async (req, res) => {
    if (req.session?.admin !== true) return res.status(401).json({ error: 'Unauthorized' });
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const { rows } = await pool.query(
        `UPDATE riskm_submissions SET status = 'APPROVED', updated_at = NOW()
         WHERE id = $1 AND status = 'PENDING' RETURNING *`,
        [id],
      );
      if (!rows.length) return res.status(400).json({ error: 'Cannot approve' });
      return res.json(rows[0]);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not approve' });
    }
  });

  app.patch('/api/riskm/submissions/:id/reject', async (req, res) => {
    if (req.session?.admin !== true) return res.status(401).json({ error: 'Unauthorized' });
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
      const { rows } = await pool.query(
        `UPDATE riskm_submissions SET status = 'REJECTED', updated_at = NOW()
         WHERE id = $1 AND status = 'PENDING' RETURNING *`,
        [id],
      );
      if (!rows.length) return res.status(400).json({ error: 'Cannot reject' });
      return res.json(rows[0]);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Could not reject' });
    }
  });
}
