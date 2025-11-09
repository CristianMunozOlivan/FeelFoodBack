import { Pool } from "pg";
import { AlimentoRepository, CreateAlimentoDTO } from "../../domain/alimento.repository.port";
import Alimento from "../../domain/alimento.entity";


export class PgAlimentoRepository implements AlimentoRepository {
  constructor(private readonly pool: Pool) {}

  async list(): Promise<Alimento[]> {
    const { rows } = await this.pool.query(
      `SELECT id, nombre, calorias FROM alimentos_catalogo ORDER BY nombre ASC`
    );
    return rows.map(Alimento.fromRow);
  }

  async getById(id: string): Promise<Alimento | null> {
    const query = `SELECT * FROM alimentos_catalogo WHERE id = $1`;
    const res = await this.pool.query(query, [id]);
    if (res.rows.length === 0) {
      return null;
    }
    return Alimento.fromRow(res.rows[0]); 
  }

  async create(input: CreateAlimentoDTO): Promise<Alimento> {
    const { rows } = await this.pool.query(
      `INSERT INTO alimentos_catalogo (nombre, calorias)
       VALUES ($1, $2)
       RETURNING id, nombre, calorias`,
      [input.nombre, input.calorias]
    );
    return Alimento.fromRow(rows[0]);
  }

  async delete(id: string): Promise<boolean> {
   const query = `DELETE FROM alimentos_catalogo WHERE id = $1`;
   const res = await this.pool.query(query, [id]);
    if (res.rowCount === 0) { 
      return false;
    }
    return true;
  }
  
  async update(id: string, input: CreateAlimentoDTO): Promise<Alimento> {
    const { rows } = await this.pool.query(
      `UPDATE alimentos_catalogo
       SET nombre = $1, calorias = $2
       WHERE id = $3
       RETURNING id, nombre, calorias`,
      [input.nombre, input.calorias, id]
    );
    return Alimento.fromRow(rows[0]);
  }

}
