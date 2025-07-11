import { query } from "./db";

export const insertBatch = async <T extends object>(
  table: string,
  rows: T[],
  batchSize = 1000
) =>{
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    
    const keys = Object.keys(batch[0]);
    const cols = keys.join(', ');

    const values: string[] = [];
    const params: any[] = [];

     batch.forEach((row, idx) => {
      const base = idx * keys.length;
      const valuePlaceholders = keys.map((_, k) => `$${base + k + 1}`);
      values.push(`(${valuePlaceholders.join(', ')})`);
      params.push(...Object.values(row));
    });
    
    
    try {
    await query(
      `INSERT INTO ${table} (${cols}) VALUES ${values.join(', ')}`,
      params
    );
    } catch (error) {
      console.error(`Error inserting batch into ${table}:`, error);
    }
  }
}