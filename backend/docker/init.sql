CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  profile_pic_path TEXT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  degree VARCHAR(50),
  grad_year INT,
  branch VARCHAR(255),
  dob DATE,
  password_hash TEXT,
  decided_at TIMESTAMPTZ,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_applications_status ON applications (status);
