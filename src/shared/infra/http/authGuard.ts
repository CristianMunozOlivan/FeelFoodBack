import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../../app/env';
// Middleware que protege rutas requiriendo un JWT válido
export function authGuard(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'unauthorized' });
  try {
    // Verifica el token
    const token = auth.slice(7);
    // Decodifica el payload y lo adjunta a req.user
    const payload = jwt.verify(token, env.JWT_SECRET);
    (req as any).user = payload;
    // Continúa al siguiente middleware
    next();
  } catch {
    return res.status(401).json({ error: 'unauthorized' });
  }
}
