import User from "./user.entity";

// Definición del repositorio de User
// Funciones para buscar y crear usuarios
export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(email: string, nombre: string, passwordHash: string): Promise<User>;
}
