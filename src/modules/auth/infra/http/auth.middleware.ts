import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { TokenPayload } from "../../domain/tokenService.port";

function extractBearerToken(req: Request): string | null {
  const h = req.headers["authorization"];
  if (!h) return null;
  const [scheme, token] = h.split(" ");
  if (!scheme || !token) return null;
  if (scheme.toLowerCase() !== "bearer") return null;
  return token;
}

/**
 * Middleware que exige un JWT válido en Authorization: Bearer <token>.
 * Si es válido, adjunta req.user = { id, email } y sigue.
 * Si no, responde 401/403 según corresponda.
 */
export function buildRequireAuth(secret: string) {
  if (!secret) throw new Error("JWT secret requerido en buildRequireAuth");

  return (req: Request, res: Response, next: NextFunction) => {
    const token = extractBearerToken(req);
    if (!token) {
      return res.status(401).json({ error: "token requerido (Bearer)" });
    }

    try {
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
      // Normalizamos el payload a tu TokenPayload
      const payload: TokenPayload | undefined =
        decoded && typeof decoded === "object"
          ? { id: String(decoded.id), email: String(decoded.email) }
          : undefined;

      if (!payload?.id || !payload?.email) {
        return res.status(403).json({ error: "token inválido (payload incompleto)" });
      }

      req.user = payload;
      next();
    } catch (e: any) {
      if (e?.name === "TokenExpiredError") {
        return res.status(401).json({ error: "token expirado" });
      }
      return res.status(401).json({ error: "token inválido" });
    }
  };
}

/**
 * Variante opcional: si hay token válido, pone req.user;
 * si no hay token o es inválido, sigue sin cortar la petición.
 */
export function buildOptionalAuth(secret: string) {
  const requireAuth = buildRequireAuth(secret);
  return (req: Request, res: Response, next: NextFunction) => {
    const token = extractBearerToken(req);
    if (!token) return next();
    // Reutilizamos la lógica de requireAuth pero sin bloquear ante error
    const resProxy = {
      status: () => res, // ignoramos setStatus
      json: () => next(), // ignoramos la respuesta de error y seguimos
    } as unknown as Response;

    // Ejecuta requireAuth, si falla no corta el flujo
    try {
      (requireAuth as any)(req, resProxy, next);
    } catch {
      next();
    }
  };
}
