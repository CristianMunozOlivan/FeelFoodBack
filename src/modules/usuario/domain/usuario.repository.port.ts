import Usuario from "./usuario.entity";
// Definición del repositorio de Usuario
export interface UsuarioRepository {
  findById(id: string): Promise<Usuario | null>;
  updateEmail(id: string, email: string): Promise<Usuario | null>;
  updatePasswordHash(id: string, passwordHash: string): Promise<void>;
}
// Definición del servicio de hash de contraseñas
export interface PasswordHasher {
  hash(plain: string): Promise<string>;
}
