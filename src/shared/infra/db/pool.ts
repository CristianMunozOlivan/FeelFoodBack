import { Pool } from 'pg';
import { env } from '../../../app/env';
// Configuración del pool de conexiones a la base de datos PostgreSQL
export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})