export type ConsumoDTO = {
  id?: string;
  comida_id: string;
  alimento_id: string;
  cantidad: number;
  unidad: string;
};

export default class Consumo {
  public id?: string;
  constructor(
    public comida_id: string,
    public alimento_id: string,
    public cantidad: number,
    public unidad: string
  ) {}
  static fromRow(row: any): Consumo {
    const c = new Consumo(row.comida_id, row.alimento_id, Number(row.cantidad), row.unidad);
    c.id = row.id;
    return c;
  }
  toDTO(): ConsumoDTO {
    return { id: this.id, comida_id: this.comida_id, alimento_id: this.alimento_id, cantidad: this.cantidad, unidad: this.unidad };
  }
}
