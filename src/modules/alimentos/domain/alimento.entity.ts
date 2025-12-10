// Definición de la entidad Alimento y su DTO
export type AlimentoDTO = {
  id?: string;
  nombre: string;
  calorias: number | null;
};

export default class Alimento {
  public id?: string;

  constructor(
    public nombre: string,
    public calorias: number | null
  ) {

    this.nombre = (nombre ?? "").trim();
    if (!this.nombre) throw new Error("nombre requerido");
    this.calorias = calorias ?? null;
  }
  // Convierte una fila de BD en una entidad Alimento
  static fromRow(row: any): Alimento {
    const a = new Alimento(row.nombre, row.calorias ?? null);
    a.id = row.id;
    return a;
  }
  // Convierte la entidad Alimento en un DTO
  toDTO(): AlimentoDTO {
    return {
      id: this.id,
      nombre: this.nombre,
      calorias: this.calorias,
    };
  }
}
