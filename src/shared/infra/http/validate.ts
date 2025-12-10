import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
// Middleware de validación usando un esquema Zod
export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    // Valida req.body contra el esquema
    const parsed = schema.safeParse(req.body);
    // Si falla, pasa el error al siguiente middleware
    if (!parsed.success) return next(parsed.error);
    // Si pasa, adjunta los datos validados a req.data
    (req as any).data = parsed.data;
    // Si pasa, continúa al siguiente middleware
    next();
  };
