// Definición de DTO y entidad User
export type UserDTO = {
  id?: string;
  email: string;
  nombre: string;
  password?: string;
  fecha_creacion?: Date;
};

// Entidad User
export default class User {
  public id?: string;
  public fecha_creacion?: Date;
  constructor(
    public email: string,
    public nombre: string,
    public password?: string
  ) {
    this.email = (email ?? "").trim().toLowerCase();
    this.nombre = (nombre ?? "").trim();
    if (!this.email) throw new Error("email requerido");
    if (!this.nombre) throw new Error("nombre requerido");
  }
// Convierte una fila de BD en una entidad User
  static fromRow(row: any): User {
    const u = new User(row.email, row.nombre, row.password);
    u.id = row.id;
    u.fecha_creacion = row.fecha_creacion ? new Date(row.fecha_creacion) : undefined;
    return u;
  }
// Convierte la entidad User en un DTO
  toDTO(safe: boolean = true): UserDTO {
    return {
      id: this.id,
      email: this.email,
      nombre: this.nombre,
      password: safe ? undefined : this.password,
      fecha_creacion: this.fecha_creacion,
    };
  }
}
