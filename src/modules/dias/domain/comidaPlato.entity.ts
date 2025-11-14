export type ComidaPlatoDTO = {
  id?: string;
  comida_id: string;
  plato_id: string;
  multiplicador: number;
  created_at: string | null;
};

export default class ComidaPlato {
  public id?: string;

  constructor(
    public comida_id: string,
    public plato_id: string,
    public multiplicador: number = 1,
    public created_at: string | null = null
  ) {
    this.comida_id = comida_id;
    this.plato_id = plato_id;
    this.multiplicador = multiplicador;
    this.created_at = created_at ?? null;
  }

  static fromRow(r: any): ComidaPlato {
    const cp = new ComidaPlato(
      r.comida_id,
      r.plato_id,
      Number(r.multiplicador ?? 1),
      r.created_at ?? null
    );
    cp.id = r.id;
    return cp;
  }

  toDTO(): ComidaPlatoDTO {
    return {
      id: this.id,
      comida_id: this.comida_id,
      plato_id: this.plato_id,
      multiplicador: this.multiplicador,
      created_at: this.created_at,
    };
  }
}
