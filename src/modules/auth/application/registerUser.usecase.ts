import type { UserRepository } from "../domain/user.repository.port";
import type { Hasher } from "../domain/hasher.port";
import type { UserDTO } from "../domain/user.entity";

export class RegisterUser {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: Hasher
  ) {}

  async execute(input: { email: string; nombre: string; password: string }): Promise<UserDTO> {
    const email = input.email.trim().toLowerCase();
    const nombre = input.nombre.trim();
    if (!email) throw new Error("email requerido");
    if (!nombre) throw new Error("nombre requerido");
    if (!input.password) throw new Error("password requerido");

    const exists = await this.users.findByEmail(email);
    if (exists) throw new Error("EMAIL_TAKEN");

    const passwordHash = await this.hasher.hash(input.password);
    const created = await this.users.create(email, nombre, passwordHash);
    return created.toDTO(); // seguro: no incluye hash
  }
}
