import pg from 'pg';

const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://reactwork:reactwork@localhost:5432/reactworkplace';

export const pool = new Pool({
  connectionString,
  max: 10,
});
