import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  GetUsuarioPerfil,
  UpdateUsuarioEmail,
  UpdateUsuarioPassword,
} from "../../application/usuario.useCase";
// Validación para actualizar email
const updateEmailBody = z.object({
  email: z.string().email(),
});
// Validación para actualizar contraseña
const updatePasswordBody = z.object({
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export class UsuarioController {
  constructor(
    private readonly getPerfilUC: GetUsuarioPerfil,
    private readonly updateEmailUC: UpdateUsuarioEmail,
    private readonly updatePasswordUC: UpdateUsuarioPassword,
  ) {}
  // Extrae el userId del request autenticado
  private getUserIdFromReq(req: Request): string {
    const user = (req as any).user;
    if (!user?.id) {
      throw new Error("No se encontró el usuario en la request");
    }
    return user.id;
  }
  // GET /usuario/perfil
  // Obtiene el perfil del usuario autenticado
  getPerfil = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = this.getUserIdFromReq(req);
      const perfil = await this.getPerfilUC.execute(userId);
      if (!perfil) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(perfil);
    } catch (e) {
      next(e);
    }
  };
  // PUT /usuario/email
  // Actualiza el email del usuario autenticado
  updateEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = this.getUserIdFromReq(req);
      const { email } = updateEmailBody.parse(req.body ?? {});
      const updated = await this.updateEmailUC.execute(userId, email);
      res.json(updated);
    } catch (e) {
      next(e);
    }
  };
  // PUT /usuario/password
  // Actualiza la contraseña del usuario autenticado
  updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = this.getUserIdFromReq(req);
      const { password } = updatePasswordBody.parse(req.body ?? {});
      await this.updatePasswordUC.execute(userId, password);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  };
}
