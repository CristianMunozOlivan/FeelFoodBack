export type EstadoAnimoDTO = { id: number; nombre: string; valor: number | null; color: string | null };

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
  static fromRow(row: any): EstadoAnimo {
    return new EstadoAnimo(row.id, row.nombre, row.valor ?? null, row.color ?? null);
  }
  toDTO(): EstadoAnimoDTO {
    return { id: this.id, nombre: this.nombre, valor: this.valor, color: this.color };
  }
}
