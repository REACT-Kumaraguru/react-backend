-- Safe to run on existing DBs (e.g. after pulling new schema)
ALTER TABLE applications ADD COLUMN IF NOT EXISTS dob DATE;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS decided_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS workplace_roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO workplace_roles (name, sort_order) VALUES
  ('REACT - FELLOWSHIP', 1),
  ('SOFTWARE TEAM', 2),
  ('MANAGEMENT TEAM', 3),
  ('RESEARCH', 4)
ON CONFLICT (name) DO NOTHING;

ALTER TABLE applications ADD COLUMN IF NOT EXISTS workplace_role_id INT REFERENCES workplace_roles(id);

ALTER TABLE applications ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;

CREATE TABLE IF NOT EXISTS riskm_submissions (
  id SERIAL PRIMARY KEY,
  application_id INT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  project_title TEXT NOT NULL DEFAULT '',
  team_name TEXT NOT NULL DEFAULT '',
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  payload JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_riskm_app ON riskm_submissions(application_id);
CREATE INDEX IF NOT EXISTS idx_riskm_status ON riskm_submissions(status);

CREATE TABLE IF NOT EXISTS programmes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  tagline TEXT,
  audience TEXT,
  duration TEXT,
  format TEXT,
  description TEXT,
  cta_label TEXT,
  link_url TEXT,
  coming_soon BOOLEAN NOT NULL DEFAULT false,
  accent_color VARCHAR(32),
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_programmes_sort ON programmes (sort_order, id);

ALTER TABLE programmes ADD COLUMN IF NOT EXISTS footnote TEXT;
ALTER TABLE programmes ADD COLUMN IF NOT EXISTS bullets JSONB NOT NULL DEFAULT '[]';
ALTER TABLE programmes ADD COLUMN IF NOT EXISTS meta_stats JSONB NOT NULL DEFAULT '[]';

ALTER TABLE programmes ADD COLUMN IF NOT EXISTS card_data JSONB NOT NULL DEFAULT '{}';
ALTER TABLE programmes ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE programmes ADD COLUMN IF NOT EXISTS theme VARCHAR(20) DEFAULT 'orange';
ALTER TABLE programmes ADD COLUMN IF NOT EXISTS slug VARCHAR(160);

CREATE UNIQUE INDEX IF NOT EXISTS idx_programmes_slug_unique ON programmes (lower(slug))
WHERE slug IS NOT NULL AND length(trim(slug)) > 0;

CREATE TABLE IF NOT EXISTS programme_form_submissions (
  id SERIAL PRIMARY KEY,
  programme_id INT NOT NULL REFERENCES programmes(id) ON DELETE CASCADE,
  payload JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_prog_form_sub_prog ON programme_form_submissions (programme_id);

CREATE TABLE IF NOT EXISTS field_projects (
  id SERIAL PRIMARY KEY,
  sort_order INT NOT NULL DEFAULT 0,
  card_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_field_projects_sort ON field_projects (sort_order, id);
