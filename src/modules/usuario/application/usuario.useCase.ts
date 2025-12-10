import type { UsuarioRepository, PasswordHasher } from "../domain/usuario.repository.port";
import type { UsuarioDTO } from "../domain/usuario.entity";
// Caso de uso: obtener perfil de usuario
export class GetUsuarioPerfil {
  constructor(private readonly repo: UsuarioRepository) {}

  async execute(usuarioId: string): Promise<UsuarioDTO | null> {
    const usuario = await this.repo.findById(usuarioId);
    return usuario ? usuario.toDTO() : null;
  }
}
// Caso de uso: actualizar email de usuario
export class UpdateUsuarioEmail {
  constructor(private readonly repo: UsuarioRepository) {}

  async execute(usuarioId: string, email: string): Promise<UsuarioDTO> {
    const usuario = await this.repo.updateEmail(usuarioId, email);
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }
    return usuario.toDTO();
  }
}
// Caso de uso: actualizar contraseña de usuario
export class UpdateUsuarioPassword {
  constructor(
    private readonly repo: UsuarioRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async execute(usuarioId: string, nuevaPassword: string): Promise<void> {
    const hash = await this.hasher.hash(nuevaPassword);
    await this.repo.updatePasswordHash(usuarioId, hash);
  }
}
