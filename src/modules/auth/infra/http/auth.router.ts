import { Router } from "express";
import { AuthController } from "./auth.controller";

export function buildAuthRouter(ctrl: AuthController): Router {
  const r = Router();
  r.post("/register", ctrl.register);
  r.post("/login", ctrl.login);
  return r;
}
