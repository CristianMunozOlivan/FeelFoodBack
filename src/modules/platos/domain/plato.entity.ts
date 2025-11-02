export type PlatoDTO = {
  id?: string;
  usuario_id: string;
  nombre: string;
};

export default class Plato {
  public id?: string;

  constructor(
    public usuario_id: string,
    public nombre: string,
  ) {
    this.usuario_id = usuario_id;
    this.nombre = (nombre ?? "").trim();
    if (!this.usuario_id) throw new Error("usuario_id requerido");
    if (!this.nombre) throw new Error("nombre requerido");
  }

  static fromRow(row: any): Plato {
    const p = new Plato(row.usuario_id, row.nombre);
    p.id = row.id;
    return p;
  }

  toDTO(): PlatoDTO {
    return { id: this.id, usuario_id: this.usuario_id, nombre: this.nombre };
  }
}
