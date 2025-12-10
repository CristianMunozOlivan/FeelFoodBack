// Definición del DTO para TipoComida
export type TipoComidaDTO = { id: number; nombre: string };
// Definición de la entidad TipoComida y su DTO
export default class TipoComida {
  constructor(public id: number, public nombre: string) {
    this.nombre = (nombre ?? "").trim();
    if (!this.nombre) throw new Error("nombre requerido");
  }
  // Convierte una fila de BD en una entidad TipoComida
  static fromRow(row: any): TipoComida {
    return new TipoComida(row.id, row.nombre);
  }
  // Convierte la entidad TipoComida en un DTO
  toDTO(): TipoComidaDTO {
    return { id: this.id, nombre: this.nombre };
  }
}
