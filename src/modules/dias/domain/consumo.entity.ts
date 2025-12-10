// Entidad Consumo: registro de consumo de un alimento en una comida
export type ConsumoDTO = {
  id?: string;
  comida_id: string;
  alimento_id: string | null; 
  cantidad: number;
  unidad: string;
  comida_plato_id: string | null;
};
// Definición de la entidad Consumo y su DTO
export default class Consumo {
  public id?: string;

  constructor(
    public comida_id: string,
    public alimento_id: string | null,
    public cantidad: number,
    public unidad: string,
    public comida_plato_id: string | null = null,
  ) {
    this.comida_id = comida_id;
    this.alimento_id = alimento_id ?? null;
    this.cantidad = cantidad;
    this.unidad = unidad;
    this.comida_plato_id = comida_plato_id ?? null;
  }
  // Convierte una fila de BD en una entidad Consumo
  static fromRow(row: any): Consumo {
    const consumo = new Consumo(
      row.comida_id,
      row.alimento_id ?? null,
      Number(row.cantidad),
      row.unidad,
      row.comida_plato_id ?? null
    );
    consumo.id = row.id;
    return consumo;
  }
  // Convierte la entidad Consumo en un DTO
  toDTO(): ConsumoDTO {
    return {
      id: this.id,
      comida_id: this.comida_id,
      alimento_id: this.alimento_id,
      cantidad: this.cantidad,
      unidad: this.unidad,
      comida_plato_id: this.comida_plato_id,
    };
  }
}
