export type PlatoIngredienteDTO = {
  id?: string;
  plato_id: string;
  alimento_id: string;
  cantidad: number;
  unidad: string;
};

export default class PlatoIngrediente {
  public id?: string;

  constructor(
    public plato_id: string,
    public alimento_id: string,
    public cantidad: number,
    public unidad: string,
  ) {
    if (!plato_id) throw new Error("plato_id requerido");
    if (!alimento_id) throw new Error("alimento_id requerido");
    if (!(cantidad > 0)) throw new Error("cantidad debe ser > 0");
    this.unidad = (unidad ?? "").trim();
    if (!this.unidad) throw new Error("unidad requerida");
  }

  static fromRow(row: any): PlatoIngrediente {
    const i = new PlatoIngrediente(row.plato_id, row.alimento_id, Number(row.cantidad), row.unidad);
    i.id = row.id;
    return i;
  }

  toDTO(): PlatoIngredienteDTO {
    return {
      id: this.id,
      plato_id: this.plato_id,
      alimento_id: this.alimento_id,
      cantidad: this.cantidad,
      unidad: this.unidad,
    };
  }
}
