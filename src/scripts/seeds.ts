import 'dotenv/config';
import { Pool } from 'pg';
function mustStr(name: string, v: unknown): string {  
  if (typeof v !== 'string' || !v.length) throw new Error(`${name} no definida o vacía`);
  return v;
}

async function main() {

  const DB_URL = mustStr('DATABASE_URL', process.env.DATABASE_URL ?? process.env.DB_URL);
  const pool = new Pool({
    connectionString: DB_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  const client = await pool.connect();
  await client.query('SELECT 1');
  client.release();
  console.log('🔌 Conexión OK con DB_URL');

  await pool.query(`
    INSERT INTO estados_animo (id, nombre, valor, color) VALUES
      (1,'Muy mal',1,'#b71c1c'),(2,'Mal',2,'#e53935'),(3,'Normal',3,'#fbc02d'),
      (4,'Bien',4,'#43a047'),(5,'Muy bien',5,'#2e7d32')
    ON CONFLICT (id) DO NOTHING;
  `);

  await pool.query(`
    INSERT INTO tipos_comida (id, nombre) VALUES
      (1,'Desayuno'),(2,'Media mañana'),(3,'Comida'),(4,'Merienda'),(5,'Cena')
    ON CONFLICT (id) DO NOTHING;
  `);

  await pool.query(`
    INSERT INTO alimentos_catalogo (nombre, calorias) VALUES
      ('Manzana',52),('Arroz blanco cocido (100g)',130),('Garbanzos cocidos (100g)',164)
    ON CONFLICT DO NOTHING;
  `);

  await pool.end();
  console.log('✅ Seed ejecutado correctamente');
}

main().catch((e) => { console.error('❌ Error en seed:', e); process.exit(1); });
