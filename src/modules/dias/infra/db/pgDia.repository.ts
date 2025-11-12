import { Pool } from "pg";
import Dia from "../../domain/dia.entity";
import Comida from "../../domain/comida.entity";
import Consumo from "../../domain/consumo.entity";
import {
  DiaRepository, CreateDiaDTO, CloseDiaDTO, AddComidaDTO, AddConsumoDTO
} from "../../domain/dia.repository.port";

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

 async listComidasByDia(dia_id: string): Promise<Comida[]> {
    const { rows } = await this.pool.query(
      `SELECT id, dia_id, tipo_id, hora
       FROM comidas_diarias
       WHERE dia_id = $1
       ORDER BY hora NULLS FIRST, id`,
      [dia_id]
    );
    return rows.map(Comida.fromRow);
  }
  
  async addConsumo(input: AddConsumoDTO): Promise<Consumo> {
    const { rows } = await this.pool.query(
      `INSERT INTO alimentos_consumidos (comida_id, alimento_id, cantidad, unidad)
       VALUES ($1, $2, $3, $4)
       RETURNING id, comida_id, alimento_id, cantidad, unidad`,
      [input.comida_id, input.alimento_id, input.cantidad, input.unidad]
    );
    return Consumo.fromRow(rows[0]);
  }

  async removeConsumo(consumo_id: string): Promise<void> {
    await this.pool.query(`DELETE FROM alimentos_consumidos WHERE id = $1`, [consumo_id]);
  }
}
