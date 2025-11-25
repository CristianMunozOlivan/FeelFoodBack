// src/modules/usuario/application/usuario.useCase.ts

import type { UsuarioRepository, PasswordHasher } from "../domain/usuario.repository.port";
import type { UsuarioDTO } from "../domain/usuario.entity";

export class GetUsuarioPerfil {
  constructor(private readonly repo: UsuarioRepository) {}

  async execute(usuarioId: string): Promise<UsuarioDTO | null> {
    const user = await this.repo.findById(usuarioId);
    return user ? user.toDTO() : null;
  }
}

export class UpdateUsuarioEmail {
  constructor(private readonly repo: UsuarioRepository) {}

  async execute(usuarioId: string, email: string): Promise<UsuarioDTO> {
    const updated = await this.repo.updateEmail(usuarioId, email);
    if (!updated) {
      throw new Error("Usuario no encontrado");
    }
    return updated.toDTO();
  }
}

export class UpdateUsuarioPassword {
  constructor(
    private readonly repo: UsuarioRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  /**
   * Versión simple: solo necesita la nueva contraseña.
   * Si más adelante quieres comprobar la antigua, se amplía el input.
   */
  async execute(usuarioId: string, nuevaPassword: string): Promise<void> {
    const hash = await this.hasher.hash(nuevaPassword);
    await this.repo.updatePasswordHash(usuarioId, hash);
  }
}
