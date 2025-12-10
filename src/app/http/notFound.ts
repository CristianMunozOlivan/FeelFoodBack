import type { Request, Response } from "express";

// Middleware para rutas no encontradas (404)
export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: "not_found" });
}
