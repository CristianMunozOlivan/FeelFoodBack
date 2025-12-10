// Definición del DTO para EstadoAnimo
export type EstadoAnimoDTO = { id: number; nombre: string; valor: number | null; color: string | null };
// Definición de la entidad EstadoAnimo y su DTO
export default class EstadoAnimo {
  constructor(
    public id: number,
    public nombre: string,
    public valor: number | null,
    public color: string | null
  ) {
    this.nombre = (nombre ?? "").trim();
    if (!this.nombre) throw new Error("nombre requerido");
  }
  // Convierte una fila de BD en una entidad EstadoAnimo
  static fromRow(row: any): EstadoAnimo {
    return new EstadoAnimo(row.id, row.nombre, row.valor ?? null, row.color ?? null);
  }
  // Convierte la entidad EstadoAnimo en un DTO
  toDTO(): EstadoAnimoDTO {
    return { id: this.id, nombre: this.nombre, valor: this.valor, color: this.color };
  }
}
