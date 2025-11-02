export type TipoComidaDTO = { id: number; nombre: string };

export default class TipoComida {
  constructor(public id: number, public nombre: string) {
    this.nombre = (nombre ?? "").trim();
    if (!this.nombre) throw new Error("nombre requerido");
  }
  static fromRow(row: any): TipoComida {
    return new TipoComida(row.id, row.nombre);
  }
  toDTO(): TipoComidaDTO {
    return { id: this.id, nombre: this.nombre };
  }
}
