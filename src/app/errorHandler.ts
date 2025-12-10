import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

// Mapear códigos de error de Postgres a HTTP 
const PG_CODE_TO_STATUS: Record<string, number> = {
  "23505": 409, // unique_violation
  "23503": 409, // foreign_key_violation
  "22P02": 400, // invalid_text_representation (UUID mal formado, etc.)
};

// Mapear mensajes de dominio a HTTP
const DOMAIN_TO_STATUS: Record<string, number> = {
  EMAIL_TAKEN: 409,             // email ya registrado
  INVALID_CREDENTIALS: 401,     // login inválido
  CREDENTIALS_REQUIRED: 400,    // falta usuario/contraseña o token
  "Día no encontrado": 404,     // día no existe
  "Alimento no encontrado": 404,// alimento no existe
  "Plato no encontrado": 404,   // plato no existe
};

// Middleware global de manejo de errores
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // Validación de entrada (Zod)
  if (err instanceof ZodError) {
    return res.status(422).json({
      error: "Error de validación",
      issues: err.issues.map(i => ({ path: i.path, message: i.message })),
    });
  }

  // Errores de Postgres
  if (err && typeof err === "object" && err.code && typeof err.code === "string") {
    const status = PG_CODE_TO_STATUS[err.code];
    if (status) {
      return res.status(status).json({
        error: "db_error",
        code: err.code,
        detail: err.detail ?? err.message,
      });
    }
  }

  // Errores de dominio conocidos (por mensaje)
  if (err && typeof err.message === "string" && DOMAIN_TO_STATUS[err.message]) {
    return res.status(DOMAIN_TO_STATUS[err.message]).json({ error: err.message });
  }

  // Fallback
  // En producción, evita loguear datos sensibles
  console.error(err);
  return res.status(500).json({ error: "internal_error" });
}
