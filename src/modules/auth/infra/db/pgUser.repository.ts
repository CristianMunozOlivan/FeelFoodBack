import { Pool } from 'pg';
import User from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository.port";

export class PgUserRepository implements UserRepository {
  constructor(private readonly pool: Pool) {}

  async findByEmail(email: string): Promise<User | null> {
    const { rows } = await this.pool.query(
      `SELECT id, email, password, nombre, fecha_creacion
       FROM usuarios
       WHERE email = $1
       LIMIT 1`,
      [email.toLowerCase()]
    );
    return rows[0] ? User.fromRow(rows[0]) : null;
  }

  async findById(id: string): Promise<User | null> {
    const { rows } = await this.pool.query(
      `SELECT id, email, password, nombre, fecha_creacion
       FROM usuarios
       WHERE id = $1
       LIMIT 1`,
      [id]
    );
    return rows[0] ? User.fromRow(rows[0]) : null;
  }

  async create(email: string, nombre: string, passwordHash: string): Promise<User> {
    const { rows } = await this.pool.query(
      `INSERT INTO usuarios (email, password, nombre)
       VALUES ($1, $2, $3)
       RETURNING id, email, password, nombre, fecha_creacion`,
      [email.toLowerCase(), passwordHash, nombre]
    );
    return User.fromRow(rows[0]);
  }
}
