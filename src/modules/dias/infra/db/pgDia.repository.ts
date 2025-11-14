import { Pool } from "pg";
import Dia from "../../domain/dia.entity";
import Comida from "../../domain/comida.entity";
import Consumo from "../../domain/consumo.entity";
import {
  DiaRepository, CreateDiaDTO, CloseDiaDTO, AddComidaDTO, AddConsumoDTO,
  AddComidaPlatoDTO
} from "../../domain/dia.repository.port";
import ComidaPlato from "../../domain/comidaPlato.entity";

export class PgDiaRepository implements DiaRepository {
  constructor(private readonly pool: Pool) {}

  async createDia(input: CreateDiaDTO): Promise<Dia> {
    const { rows } = await this.pool.query(
      `INSERT INTO dias_registro (usuario_id, fecha, estado_animo_inicio_id, notas)
       VALUES ($1, $2, $3, $4)
       RETURNING id, usuario_id, fecha, estado_animo_inicio_id, estado_animo_final_id, notas`,
      [input.usuario_id, input.fecha, input.estado_animo_inicio_id, input.notas ?? null]
    );
    return Dia.fromRow(rows[0]);
  }

  async listDiasByUsuario(usuario_id: string, desde?: string, hasta?: string): Promise<Dia[]> {
    const params: any[] = [usuario_id];
    let where = `usuario_id = $1`;
    if (desde) { params.push(desde); where += ` AND fecha >= $${params.length}`; }
    if (hasta) { params.push(hasta); where += ` AND fecha <= $${params.length}`; }

    const { rows } = await this.pool.query(
      `SELECT id, usuario_id, fecha, estado_animo_inicio_id, estado_animo_final_id, notas
       FROM dias_registro
       WHERE ${where}
       ORDER BY fecha DESC`,
      params
    );
    return rows.map(Dia.fromRow);
  }

  async closeDia(input: CloseDiaDTO): Promise<Dia | null> {
    const { rows } = await this.pool.query(
      `UPDATE dias_registro
       SET estado_animo_final_id = $2
       WHERE id = $1
       RETURNING id, usuario_id, fecha, estado_animo_inicio_id, estado_animo_final_id, notas`,
      [input.dia_id, input.estado_animo_final_id]
    );
    return rows[0] ? Dia.fromRow(rows[0]) : null;
  }

  async addComida(input: AddComidaDTO): Promise<Comida> {
    const { rows } = await this.pool.query(
      `INSERT INTO comidas_diarias (dia_id, tipo_id, hora)
       VALUES ($1, $2, $3)
       RETURNING id, dia_id, tipo_id, hora`,
      [input.dia_id, input.tipo_id, input.hora ?? null]
    );
    return Comida.fromRow(rows[0]);
  }

  async addComidaPlato(input: AddComidaPlatoDTO): Promise<ComidaPlato> {
    const mult = input.multiplicador && input.multiplicador > 0 ? input.multiplicador : 1;
    const q = `
      INSERT INTO comidas_platos (comida_id, plato_id, multiplicador)
      VALUES ($1, $2, $3)
      RETURNING id, comida_id, plato_id, multiplicador, created_at
    `;
    const { rows } = await this.pool.query(q, [input.comida_id, input.plato_id, mult]);
    return ComidaPlato.fromRow(rows[0]);
  }


  async listComidasByDia(dia_id: string): Promise<Comida[]> {
    // 1) Obtenemos las comidas del día
    const { rows } = await this.pool.query(
      `SELECT id, dia_id, tipo_id, hora
       FROM comidas_diarias
       WHERE dia_id = $1
       ORDER BY hora NULLS FIRST, id`,
      [dia_id]
    );
    const comidas = rows.map(Comida.fromRow);

    if (comidas.length === 0) return [];

    // 2) Obtenemos todos los consumos de esas comidas en un solo query
    const comidaIds = comidas
      .map((c) => c.id)
      .filter((id): id is string => Boolean(id));

    const { rows: consumosRows } = await this.pool.query(
      `SELECT id, comida_id, alimento_id, cantidad, unidad, comida_plato_id
       FROM alimentos_consumidos
       WHERE comida_id = ANY($1::uuid[])
       ORDER BY comida_id, id`,
      [comidaIds]
    );

    const consumos = consumosRows.map(Consumo.fromRow);

    // 3) Agrupamos consumos por comida_id
    const map = new Map<string, Consumo[]>();
    for (const cons of consumos) {
      if (!cons.comida_id) continue;
      if (!map.has(cons.comida_id)) map.set(cons.comida_id, []);
      map.get(cons.comida_id)!.push(cons);
    }

    // 4) Enganchamos consumos a cada comida
    comidas.forEach((c) => {
      const key = c.id!;
      c.setConsumos(map.get(key) ?? []);
    });

    return comidas;
  }

  async addConsumo(input: AddConsumoDTO): Promise<Consumo> {
    const q = `
      INSERT INTO alimentos_consumidos (comida_id, alimento_id, cantidad, unidad, comida_plato_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, comida_id, alimento_id, cantidad, unidad, comida_plato_id
    `;
    const params = [
      input.comida_id,
      input.alimento_id,
      input.cantidad,
      input.unidad,
      input.comida_plato_id ?? null,
    ];
    const { rows } = await this.pool.query(q, params);
    return Consumo.fromRow(rows[0]);
  }

  async removeConsumo(consumo_id: string): Promise<void> {
    await this.pool.query(`DELETE FROM alimentos_consumidos WHERE id = $1`, [consumo_id]);
  }

  // Listar grupos plato-comida para el hook useComidaPlatoMap
  async listComidaPlatosByComida(comida_id: string): Promise<ComidaPlato[]> {
    const q = `
      SELECT id, comida_id, plato_id, multiplicador, created_at
      FROM comidas_platos
      WHERE comida_id = $1
      ORDER BY created_at NULLS FIRST, id
    `;
    const { rows } = await this.pool.query(q, [comida_id]);
    return rows.map(ComidaPlato.fromRow);
  }
}
