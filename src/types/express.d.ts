import type { TokenPayload } from "../app/modules/auth/domain/tokenService.port";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};
