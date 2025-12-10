import type { TokenPayload } from "../app/modules/auth/domain/tokenService.port";
// Extiende la interfaz Request de Express para incluir user opcional
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};
