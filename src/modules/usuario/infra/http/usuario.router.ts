// src/modules/usuario/infra/http/usuario.router.ts

import { Router } from "express";
import { UsuarioController } from "./usuario.controller";

export function buildUsuarioRouter(controller: UsuarioController) {
  const router = Router();

  // /usuario/me        -> GET datos del usuario
  router.get("/me", controller.getPerfil);

  // /usuario/email     -> PATCH email
  router.patch("/email", controller.updateEmail);

  // /usuario/password  -> PATCH password
  router.patch("/password", controller.updatePassword);

  return router;
}
