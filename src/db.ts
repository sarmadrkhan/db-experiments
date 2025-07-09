import { Pool, QueryConfig } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'test',
  port: 5432
});

export const query = async (text: string | QueryConfig, params?: any[]) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;

  console.log(`Executed query in ${duration}ms`);
  return res;
};

export const analyzeQuery = async (text: string, params?: any[]) => {
  const explain = await pool.query(`EXPLAIN ANALYZE ${text}`, params);
  console.log('EXPLAIN ANALYZE:\n' + explain.rows.map(r => r['QUERY PLAN']).join('\n'));
};
