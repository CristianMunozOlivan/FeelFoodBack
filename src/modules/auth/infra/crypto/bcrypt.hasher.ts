import bcrypt from "bcrypt";
import { Hasher } from "../../domain/hasher.port";

// Implementación del servicio de hashing usando bcrypt
export class BcryptHasher implements Hasher {
  constructor(private readonly rounds: number = 10) {}
  async hash(raw: string): Promise<string> { return bcrypt.hash(raw, this.rounds); }
  async compare(raw: string, hashed: string): Promise<boolean> { return bcrypt.compare(raw, hashed); }
}
