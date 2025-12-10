// DTO para Sintoma
export type SintomaDTO = {
  id: number;
  nombre: string;
  descripcion: string | null;
};
// Definición de la entidad Sintoma y su DTO
export default class Sintoma {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string | null,
  ) {
    if (!nombre) throw new Error("nombre de síntoma requerido");
  }
  // Convierte una fila de BD en una entidad Sintoma
  static fromRow(row: any): Sintoma {
    return new Sintoma(
      Number(row.id),
      row.nombre,
      row.descripcion ?? null,
    );
  }
  // Convierte la entidad Sintoma en un DTO
  toDTO(): SintomaDTO {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
    };
  }
}
