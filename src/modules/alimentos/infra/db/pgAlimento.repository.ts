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

  async create(input: CreateAlimentoDTO): Promise<Alimento> {
    const { rows } = await this.pool.query(
      `INSERT INTO alimentos_catalogo (nombre, calorias)
       VALUES ($1, $2)
       RETURNING id, nombre, calorias`,
      [input.nombre, input.calorias]
    );
    return Alimento.fromRow(rows[0]);
  }
}
