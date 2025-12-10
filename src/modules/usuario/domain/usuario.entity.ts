// DTO usuario
export type UsuarioDTO = {
  id: string;
  email: string;
  fecha_creacion: string | null;
};
// Definición de la entidad Usuario
export default class Usuario {
  constructor(
    public id: string,
    public email: string,
    public password: string | null,
    public fecha_creacion: string | null,
  ) {}
  // Convierte una fila de BD en una entidad Usuario
  static fromRow(row: any): Usuario {
    return new Usuario(
      row.id,
      row.email,
      row.password ?? null,
      row.fecha_creacion ?? row.created_at ?? null,
    );
  }
  // Convierte la entidad Usuario en un DTO
  toDTO(): UsuarioDTO {
    return {
      id: this.id,
      email: this.email,
      fecha_creacion: this.fecha_creacion,
    };
  }
}
