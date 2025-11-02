import { Pool } from "pg";
import { CatalogRepository } from "../../domain/catalog.repository.port";
import EstadoAnimo from "../../domain/estadoAnimo.entity";
import TipoComida from "../../domain/tipoComida.entity";

export class PgCatalogRepository implements CatalogRepository {
  constructor(private readonly pool: Pool) {}

  async listEstadosAnimo(): Promise<EstadoAnimo[]> {
    const { rows } = await this.pool.query(
      `SELECT id, nombre, valor, color FROM estados_animo ORDER BY id ASC`
    );
    return rows.map(EstadoAnimo.fromRow);
  }

  async listTiposComida(): Promise<TipoComida[]> {
    const { rows } = await this.pool.query(
      `SELECT id, nombre FROM tipos_comida ORDER BY id ASC`
    );
    return rows.map(TipoComida.fromRow);
  }
}
