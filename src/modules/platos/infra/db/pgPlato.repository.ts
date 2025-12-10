import { Pool } from "pg";
import Plato from "../../domain/plato.entity";
import PlatoIngrediente from "../../domain/ingrediente.entity";
import { PlatoRepository, CreatePlatoDTO, AddIngredienteDTO, UpdatePlatoDTO } from "../../domain/plato.repository.port";
// Implementación del repositorio de Plato usando PostgreSQL
export class PgPlatoRepository implements PlatoRepository {
  constructor(private readonly pool: Pool) {}
  // Lista platos por usuario
  async listByUsuario(usuario_id: string): Promise<Plato[]> {
    const { rows } = await this.pool.query(
      `SELECT id, usuario_id, nombre
       FROM platos_personales
       WHERE usuario_id = $1
       ORDER BY nombre ASC`,
      [usuario_id]
    );
    return rows.map(Plato.fromRow);
  }
  // Crea un nuevo plato
  async create(input: CreatePlatoDTO): Promise<Plato> {
    const { rows } = await this.pool.query(
      `INSERT INTO platos_personales (usuario_id, nombre)
       VALUES ($1, $2)
       RETURNING id, usuario_id, nombre`,
      [input.usuario_id, input.nombre]
    );
    return Plato.fromRow(rows[0]);
  }
  // Actualiza un plato
  async update(input: UpdatePlatoDTO): Promise<Plato> {
    const { rows } = await this.pool.query(
      `UPDATE platos_personales
        SET nombre = $3
        WHERE id = $1 AND usuario_id = $2
        RETURNING id, usuario_id, nombre`,
      [input.plato_id, input.usuario_id, input.nombre]
    );
    return Plato.fromRow(rows[0]);
  }
  // Elimina un plato
  async delete(plato_id: string, usuario_id: string): Promise<void> {
    await this.pool.query(
      `DELETE FROM platos_personales
        WHERE id = $1 AND usuario_id = $2`,
      [plato_id, usuario_id]
    );
  }
  // Añade un ingrediente a un plato
  async addIngrediente(input: AddIngredienteDTO): Promise<PlatoIngrediente> {
    const { rows } = await this.pool.query(
      `INSERT INTO plato_ingredientes (plato_id, alimento_id, cantidad, unidad)
       VALUES ($1, $2, $3, $4)
       RETURNING id, plato_id, alimento_id, cantidad, unidad`,
      [input.plato_id, input.alimento_id, input.cantidad, input.unidad]
    );
    return PlatoIngrediente.fromRow(rows[0]);
  }
  // Lista ingredientes de un plato
  async listIngredientes(plato_id: string): Promise<PlatoIngrediente[]> {
    const { rows } = await this.pool.query(
      `SELECT id, plato_id, alimento_id, cantidad, unidad
       FROM plato_ingredientes
       WHERE plato_id = $1
       ORDER BY id`,
      [plato_id]
    );
    return rows.map(PlatoIngrediente.fromRow);
  }
  // Elimina un ingrediente de un plato
  async removeIngrediente(ingrediente_id: string): Promise<void> {
    await this.pool.query(`DELETE FROM plato_ingredientes WHERE id = $1`, [ingrediente_id]);
  }
  // Actualiza un ingrediente de un plato
  async updateIngrediente(ingrediente_id: string, input: { cantidad: number; unidad: string }): Promise<PlatoIngrediente> {
    const { rows } = await this.pool.query(
      `UPDATE plato_ingredientes
       SET cantidad = $2, unidad = $3
       WHERE id = $1
       RETURNING id, plato_id, alimento_id, cantidad, unidad`,
      [ingrediente_id, input.cantidad, input.unidad]
    );
    return PlatoIngrediente.fromRow(rows[0]);
  }
}
