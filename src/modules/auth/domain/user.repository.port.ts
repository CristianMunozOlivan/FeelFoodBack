import User from "./user.entity";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(email: string, nombre: string, passwordHash: string): Promise<User>;
}
