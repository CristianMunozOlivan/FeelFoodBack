// Entidad ComidaPlato: relación entre comida y plato
export type ComidaPlatoDTO = {
  id?: string;
  comida_id: string;
  plato_id: string;
  multiplicador: number;
  created_at: string | null;
};
// Definición de la entidad ComidaPlato y su DTO
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
  // Convierte una fila de BD en una entidad ComidaPlato
  static fromRow(row: any): ComidaPlato {
    const comidaPlato = new ComidaPlato(
      row.comida_id,
      row.plato_id,
      Number(row.multiplicador ?? 1),
      row.created_at ?? null
    );
    comidaPlato.id = row.id;
    return comidaPlato;
  }
  // Convierte la entidad ComidaPlato en un DTO
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
