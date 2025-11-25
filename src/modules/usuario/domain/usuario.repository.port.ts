// src/modules/usuario/domain/usuario.repository.port.ts

import Usuario from "./usuario.entity";

export interface UsuarioRepository {
  findById(id: string): Promise<Usuario | null>;
  updateEmail(id: string, email: string): Promise<Usuario | null>;
  updatePasswordHash(id: string, passwordHash: string): Promise<void>;
}

/**
 * Hasher mínimo que necesitamos aquí.
 * BcryptHasher del módulo auth encaja por "duck typing"
 * porque expone .hash(plain: string): Promise<string>
 */
export interface PasswordHasher {
  hash(plain: string): Promise<string>;
}
