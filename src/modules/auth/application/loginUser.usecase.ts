import type { UserRepository } from "../domain/user.repository.port";
import type { Hasher } from "../domain/hasher.port";
import type { TokenService } from "../domain/tokenService.port";

export class LoginUser {
  constructor(
    private readonly users: UserRepository,
    private readonly hasher: Hasher,
    private readonly tokens: TokenService
  ) {}

  async execute(input: { email: string; password: string }): Promise<{ token: string }> {
    const email = input.email.trim().toLowerCase();
    if (!email || !input.password) throw new Error("CREDENTIALS_REQUIRED");

    const user = await this.users.findByEmail(email);
    if (!user || !user.password) throw new Error("INVALID_CREDENTIALS");

    const ok = await this.hasher.compare(input.password, user.password);
    if (!ok) throw new Error("INVALID_CREDENTIALS");

    if (!user.id) throw new Error("USER_WITHOUT_ID");
    const token = await this.tokens.sign({ id: user.id, email: user.email });
    return { token };
  }
}
