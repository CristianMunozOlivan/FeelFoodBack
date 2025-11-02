import { Pool } from 'pg';
import { env } from '../../../app/env';

export const pool = new Pool({ connectionString: env.DB_URL });
