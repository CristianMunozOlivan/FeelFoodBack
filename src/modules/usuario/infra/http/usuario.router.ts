import { Router } from "express";
import { UsuarioController } from "./usuario.controller";
// Construye el router de Usuario
export function buildUsuarioRouter(controller: UsuarioController) {
  const router = Router();

  router.get("/me", controller.getPerfil); // Obtener perfil del usuario autenticado
  router.patch("/email", controller.updateEmail); // Actualizar email del usuario autenticado
  router.patch("/password", controller.updatePassword); // Actualizar contraseña del usuario autenticado

  return router;
}
