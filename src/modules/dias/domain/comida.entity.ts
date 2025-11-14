// src/modules/dias/domain/comida.entity.ts
import Consumo, { type ConsumoDTO } from "./consumo.entity";

export type ComidaDTO = {
  id?: string;
  dia_id: string;
  tipo_id: number; // FK tipos_comida
  hora?: string | null; // HH:mm:ss opcional
  consumos?: ConsumoDTO[]; // <--- NUEVO
};

export default class Comida {
  public id?: string;

  // lista de consumos asociada a esta comida
  public consumos: Consumo[] = [];

  constructor(
    public dia_id: string,
    public tipo_id: number,
    public hora: string | null = null
  ) {
    this.dia_id = dia_id;
    this.tipo_id = tipo_id;
    this.hora = hora ?? null;
  }

  static fromRow(row: any): Comida {
    const c = new Comida(row.dia_id, row.tipo_id, row.hora ?? null);
    c.id = row.id;
    return c;
  }

  setConsumos(consumos: Consumo[]) {
    this.consumos = consumos;
  }

  toDTO(): ComidaDTO {
    return {
      id: this.id,
      dia_id: this.dia_id,
      tipo_id: this.tipo_id,
      hora: this.hora ?? null,
      consumos: this.consumos.map((c) => c.toDTO()),
    };
  }
}
