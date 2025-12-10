import { readFileSync } from 'fs';
import { resolve } from 'path';
import { pool } from './pool';
// Ejecuta la migración de creación de tablas
async function main() {
  const sqlPath = resolve(process.cwd(), 'sql', 'creacion.sql');
  const sql = readFileSync(sqlPath, 'utf8');
  await pool.query(sql);
  console.log('Migración ejecutada');
  await pool.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
