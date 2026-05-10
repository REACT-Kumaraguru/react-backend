import { pool } from './db.js';

/** Idempotent — safe on every startup (existing DBs without new columns). */
export async function runMigrations() {
  await pool.query(`
    ALTER TABLE applications ADD COLUMN IF NOT EXISTS dob DATE;
    ALTER TABLE applications ADD COLUMN IF NOT EXISTS password_hash TEXT;
    ALTER TABLE applications ADD COLUMN IF NOT EXISTS decided_at TIMESTAMPTZ;
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS od_submissions (
      id SERIAL PRIMARY KEY,
      application_id INT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
      subject TEXT NOT NULL DEFAULT '',
      salutation VARCHAR(10) NOT NULL DEFAULT 'Madam',
      student_name VARCHAR(255) NOT NULL DEFAULT '',
      register_number VARCHAR(80),
      department_year TEXT,
      od_category VARCHAR(30) NOT NULL DEFAULT 'SPECIAL_ON_DUTY',
      from_date DATE NOT NULL,
      to_date DATE NOT NULL,
      schedule_type VARCHAR(20) NOT NULL DEFAULT 'ONLY_CLASS',
      exclude_sundays BOOLEAN NOT NULL DEFAULT true,
      week_hours JSONB NOT NULL DEFAULT '{}',
      description_1 TEXT,
      description_2 TEXT,
      status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
      admin_notes TEXT,
      sent_at TIMESTAMPTZ,
      decided_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_od_submissions_app ON od_submissions(application_id);
    CREATE INDEX IF NOT EXISTS idx_od_submissions_status ON od_submissions(status);
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS workplace_roles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  await pool.query(`
    ALTER TABLE applications ADD COLUMN IF NOT EXISTS workplace_role_id INT REFERENCES workplace_roles(id);
  `);
  await pool.query(`
    INSERT INTO workplace_roles (name, sort_order) VALUES
      ('REACT - FELLOWSHIP', 1),
      ('SOFTWARE TEAM', 2),
      ('MANAGEMENT TEAM', 3),
      ('RESEARCH', 4)
    ON CONFLICT (name) DO NOTHING;
  `);
  await pool.query(`
    ALTER TABLE applications ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_accounts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_admin_accounts_email ON admin_accounts (lower(email));
  `);
  await pool.query(`
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
  `);

  await pool.query(`
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
  `);

  await pool.query(`
    ALTER TABLE programmes ADD COLUMN IF NOT EXISTS footnote TEXT;
    ALTER TABLE programmes ADD COLUMN IF NOT EXISTS bullets JSONB NOT NULL DEFAULT '[]';
    ALTER TABLE programmes ADD COLUMN IF NOT EXISTS meta_stats JSONB NOT NULL DEFAULT '[]';
  `);

  await pool.query(`
    ALTER TABLE programmes ADD COLUMN IF NOT EXISTS card_data JSONB NOT NULL DEFAULT '{}';
    ALTER TABLE programmes ADD COLUMN IF NOT EXISTS category TEXT;
    ALTER TABLE programmes ADD COLUMN IF NOT EXISTS theme VARCHAR(20) DEFAULT 'orange';
    ALTER TABLE programmes ADD COLUMN IF NOT EXISTS slug VARCHAR(160);
  `);
  await pool.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_programmes_slug_unique ON programmes (lower(slug))
    WHERE slug IS NOT NULL AND length(trim(slug)) > 0;
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS programme_form_submissions (
      id SERIAL PRIMARY KEY,
      programme_id INT NOT NULL REFERENCES programmes(id) ON DELETE CASCADE,
      payload JSONB NOT NULL DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_prog_form_sub_prog ON programme_form_submissions (programme_id);
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS field_projects (
      id SERIAL PRIMARY KEY,
      sort_order INT NOT NULL DEFAULT 0,
      card_data JSONB NOT NULL DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_field_projects_sort ON field_projects (sort_order, id);
  `);
  await pool.query(`
    ALTER TABLE applications ADD COLUMN IF NOT EXISTS gender VARCHAR(10);
    ALTER TABLE applications ADD COLUMN IF NOT EXISTS register_number VARCHAR(50);

    CREATE TABLE IF NOT EXISTS profile_update_requests (
      id SERIAL PRIMARY KEY,
      application_id INT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
      old_data JSONB NOT NULL,
      new_data JSONB NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      decided_at TIMESTAMPTZ,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_profile_req_app ON profile_update_requests(application_id);
    CREATE INDEX IF NOT EXISTS idx_profile_req_status ON profile_update_requests(status);
  `);
}
