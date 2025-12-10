import jwt from "jsonwebtoken";
import { TokenPayload, TokenService } from "../../domain/tokenService.port";

// Implementación del servicio de tokens usando JWT
export class JwtTokenService implements TokenService {
  constructor(private readonly secret: string, private readonly expiresIn: string = "1d") {}
  async sign(payload: TokenPayload): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn } as jwt.SignOptions);
  }
}
