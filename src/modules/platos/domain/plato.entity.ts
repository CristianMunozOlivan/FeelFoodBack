// DTO y entidad de Plato
export type PlatoDTO = {
  id?: string;
  usuario_id: string;
  nombre: string;
};
// Definición de la entidad Plato y su DTO
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
  // Convierte una fila de BD en una entidad Plato
  static fromRow(row: any): Plato {
    const p = new Plato(row.usuario_id, row.nombre);
    p.id = row.id;
    return p;
  }
  // Convierte la entidad Plato en un DTO
  toDTO(): PlatoDTO {
    return { id: this.id, usuario_id: this.usuario_id, nombre: this.nombre };
  }
}
