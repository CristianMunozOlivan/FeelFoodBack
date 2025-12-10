import Consumo, { type ConsumoDTO } from "./consumo.entity";
//Entidad y DTO de Comida
export type ComidaDTO = {
  id?: string;
  dia_id: string;
  tipo_id: number; 
  hora?: string | null; 
  consumos?: ConsumoDTO[]; 
};
// Definición de la entidad Comida y su DTO
export default class Comida {
  public id?: string;
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
  // Convierte una fila de BD en una entidad Comida
  static fromRow(row: any): Comida {
    const comida = new Comida(row.dia_id, row.tipo_id, row.hora ?? null);
    comida.id = row.id;
    return comida;
  }
  // Asigna la lista de consumos a esta comida
  setConsumos(consumos: Consumo[]) {
    this.consumos = consumos;
  }
  // Convierte la entidad Comida en un DTO
  toDTO(): ComidaDTO {
    return {
      id: this.id,
      dia_id: this.dia_id,
      tipo_id: this.tipo_id,
      hora: this.hora ?? null,
      consumos: this.consumos.map((consumo) => consumo.toDTO()),
    };
  }
}
