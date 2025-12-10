import { Pool } from "pg";
import {
  SensacionesRepository,
  SensacionComidaCreateInput,
  SensacionComidaUpdateInput,
  SensacionPlatoCreateInput,
  SensacionPlatoUpdateInput,
  SensacionAlimentoCreateInput,
  SensacionAlimentoUpdateInput,
} from "../../domain/sensaciones.repository.port";
import SensacionComida from "../../domain/sensacionComida.entity";
import SensacionPlato from "../../domain/sensacionPlato.entity";
import SensacionAlimento from "../../domain/sensacionAlimento.entity";
import Sintoma from "../../domain/sintoma.entity";
// Implementación del repositorio de Sensaciones usando PostgreSQL
export class PgSensacionesRepository implements SensacionesRepository {
  constructor(private readonly pool: Pool) {}
  // Crear sensación de comida
  async createSensacionComida(input: SensacionComidaCreateInput): Promise<SensacionComida> {
    const query = `
      INSERT INTO sensaciones_comida (comida_id, estado_animo_id, saciedad, energia, sintomas, notas)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, comida_id, estado_animo_id, saciedad, energia, sintomas, notas, creado_en
    `;
    const params = [
      input.comida_id,
      input.estado_animo_id ?? null,
      input.saciedad ?? null,
      input.energia ?? null,
      input.sintomas ?? null,
      input.notas ?? null,
    ];
    const { rows } = await this.pool.query(query, params);
    return SensacionComida.fromRow(rows[0]);
  }
  // Actualizar sensación de comida por comida_id
  async updateSensacionComidaByComidaId(
    comida_id: string,
    input: SensacionComidaUpdateInput
  ): Promise<SensacionComida | null> {
    const query = `
      UPDATE sensaciones_comida
      SET
        estado_animo_id = $2,
        saciedad        = $3,
        energia         = $4,
        sintomas        = $5,
        notas           = $6
      WHERE comida_id = $1
      RETURNING id, comida_id, estado_animo_id, saciedad, energia, sintomas, notas, creado_en
    `;
    const params = [
      comida_id,
      input.estado_animo_id ?? null,
      input.saciedad ?? null,
      input.energia ?? null,
      input.sintomas ?? null,
      input.notas ?? null,
    ];
    const { rows } = await this.pool.query(query, params);
    if (rows.length === 0) return null;
    return SensacionComida.fromRow(rows[0]);
  }
  // Buscar sensación de comida por comida_id
  async findSensacionComidaByComidaId(comida_id: string): Promise<SensacionComida | null> {
    const { rows } = await this.pool.query(
      `SELECT id, comida_id, estado_animo_id, saciedad, energia, sintomas, notas, creado_en
       FROM sensaciones_comida
       WHERE comida_id = $1`,
      [comida_id],
    );
    if (rows.length === 0) return null;
    return SensacionComida.fromRow(rows[0]);
  }
  // Crear sensación de plato
  async createSensacionPlato(input: SensacionPlatoCreateInput): Promise<SensacionPlato> {
    const query = `
      INSERT INTO sensaciones_plato (comida_plato_id, tolerancia, sintomas, notas)
      VALUES ($1, $2, $3, $4)
      RETURNING id, comida_plato_id, tolerancia, sintomas, notas, creado_en
    `;
    const params = [
      input.comida_plato_id,
      input.tolerancia ?? null,
      input.sintomas ?? null,
      input.notas ?? null,
    ];
    const { rows } = await this.pool.query(query, params);
    return SensacionPlato.fromRow(rows[0]);
  }
  // Actualizar sensación de plato por comida_plato_id
  async updateSensacionPlatoByComidaPlatoId(
    comida_plato_id: string,
    input: SensacionPlatoUpdateInput
  ): Promise<SensacionPlato | null> {
    const query = `
      UPDATE sensaciones_plato
      SET
        tolerancia = $2,
        sintomas   = $3,
        notas      = $4
      WHERE comida_plato_id = $1
      RETURNING id, comida_plato_id, tolerancia, sintomas, notas, creado_en
    `;
    const params = [
      comida_plato_id,
      input.tolerancia ?? null,
      input.sintomas ?? null,
      input.notas ?? null,
    ];
    const { rows } = await this.pool.query(query, params);
    if (rows.length === 0) return null;
    return SensacionPlato.fromRow(rows[0]);
  }
  // Buscar sensación de plato por comida_plato_id
  async findSensacionPlatoByComidaPlatoId(comida_plato_id: string): Promise<SensacionPlato | null> {
    const { rows } = await this.pool.query(
      `SELECT id, comida_plato_id, tolerancia, sintomas, notas, creado_en
       FROM sensaciones_plato
       WHERE comida_plato_id = $1`,
      [comida_plato_id],
    );
    if (rows.length === 0) return null;
    return SensacionPlato.fromRow(rows[0]);
  }

  // Crear sensación de alimento (consumo)
  async createSensacionAlimento(input: SensacionAlimentoCreateInput): Promise<SensacionAlimento> {
    const query = `
      INSERT INTO sensaciones_alimento (alimento_consumido_id, tolerancia, sintomas, notas)
      VALUES ($1, $2, $3, $4)
      RETURNING id, alimento_consumido_id, tolerancia, sintomas, notas, creado_en
    `;
    const params = [
      input.alimento_consumido_id,
      input.tolerancia ?? null,
      input.sintomas ?? null,
      input.notas ?? null,
    ];
    const { rows } = await this.pool.query(query, params);
    return SensacionAlimento.fromRow(rows[0]);
  }
  // Actualizar sensación de alimento por alimento_consumido_id
  async updateSensacionAlimentoByConsumoId(
    alimento_consumido_id: string,
    input: SensacionAlimentoUpdateInput
  ): Promise<SensacionAlimento | null> {
    const query = `
      UPDATE sensaciones_alimento
      SET
        tolerancia = $2,
        sintomas   = $3,
        notas      = $4
      WHERE alimento_consumido_id = $1
      RETURNING id, alimento_consumido_id, tolerancia, sintomas, notas, creado_en
    `;
    const params = [
      alimento_consumido_id,
      input.tolerancia ?? null,
      input.sintomas ?? null,
      input.notas ?? null,
    ];
    const { rows } = await this.pool.query(query, params);
    if (rows.length === 0) return null;
    return SensacionAlimento.fromRow(rows[0]);
  }
  // Buscar sensación de alimento por alimento_consumido_id
  async findSensacionAlimentoByConsumoId(alimento_consumido_id: string): Promise<SensacionAlimento | null> {
    const { rows } = await this.pool.query(
      `SELECT id, alimento_consumido_id, tolerancia, sintomas, notas, creado_en
       FROM sensaciones_alimento
       WHERE alimento_consumido_id = $1`,
      [alimento_consumido_id],
    );
    if (rows.length === 0) return null;
    return SensacionAlimento.fromRow(rows[0]);
  }
  // Listar todos los síntomas
   async listSintomas(): Promise<Sintoma[]> {
    const query = `
      SELECT id, nombre, descripcion
      FROM sensaciones_sintomas
      ORDER BY id ASC
    `;
    const { rows } = await this.pool.query(query);
    return rows.map(Sintoma.fromRow);
  }
  // Buscar síntomas por una lista de IDs
  async findSintomasByIds(ids: number[]): Promise<Sintoma[]> {
    if (!ids || ids.length === 0) return [];

    const query = `
      SELECT id, nombre, descripcion
      FROM sensaciones_sintomas
      WHERE id = ANY($1::int[])
      ORDER BY id ASC
    `;
    const { rows } = await this.pool.query(query, [ids]);
    return rows.map(Sintoma.fromRow);
  }
}
