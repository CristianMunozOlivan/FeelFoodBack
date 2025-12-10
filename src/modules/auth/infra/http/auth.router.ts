import { Router } from "express";
import { AuthController } from "./auth.controller";

// Construye el router de auth (register, login)
export function buildAuthRouter(ctrl: AuthController): Router {
  const r = Router();
  r.post("/register", ctrl.register); // Registro de usuario
  r.post("/login", ctrl.login); // Login de usuario
  return r;
}
