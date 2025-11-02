import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { RegisterUser } from "../../application/registerUser.usecase";
import { LoginUser } from "../../application/loginUser.usecase";

const registerSchema = z.object({
  email: z.string().email(),
  nombre: z.string().min(1),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export class AuthController {
  constructor(
    private readonly registerUser: RegisterUser,
    private readonly loginUser: LoginUser
  ) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = registerSchema.parse(req.body);
      const out = await this.registerUser.execute(data);
      res.status(201).json(out);
    } catch (e: any) {
      if (e?.message === "EMAIL_TAKEN") { res.status(409).json({ error: "email ya registrado" }); return; }
      next(e);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = loginSchema.parse(req.body);
      const out = await this.loginUser.execute(data);
      res.json(out);
    } catch (e: any) {
      if (e?.message === "INVALID_CREDENTIALS" || e?.message === "CREDENTIALS_REQUIRED") {
        res.status(401).json({ error: "credenciales inválidas" }); return;
      }
      next(e);
    }
  };
}
