// src/modules/usuario/infra/db/pgUsuario.repository.ts

import { Pool } from "pg";
import Usuario from "../../domain/usuario.entity";
import type { UsuarioRepository } from "../../domain/usuario.repository.port";

export class PgUsuarioRepository implements UsuarioRepository {
  constructor(private readonly pool: Pool) {}

  async findById(id: string): Promise<Usuario | null> {
    const res = await this.pool.query(
      `SELECT id, email, password, fecha_creacion
       FROM usuarios
       WHERE id = $1`,
      [id],
    );

    if (res.rows.length === 0) return null;
    return Usuario.fromRow(res.rows[0]);
  }

  async updateEmail(id: string, email: string): Promise<Usuario | null> {
    const res = await this.pool.query(
      `UPDATE usuarios
       SET email = $2
       WHERE id = $1
       RETURNING id, email, password, fecha_creacion`,
      [id, email],
    );

    if (res.rows.length === 0) return null;
    return Usuario.fromRow(res.rows[0]);
  }

  async updatePasswordHash(id: string, passwordHash: string): Promise<void> {
    await this.pool.query(
      `UPDATE usuarios
       SET password = $2
       WHERE id = $1`,
      [id, passwordHash],
    );
  }
}
