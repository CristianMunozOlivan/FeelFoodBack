import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return next(parsed.error);
    (req as any).data = parsed.data;
    next();
  };
