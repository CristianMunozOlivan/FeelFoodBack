import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { CreateAlimento, ListAlimentos } from "../../application/alimento.useCase";


// Validación de entrada con Zod
const createSchema = z.object({
  nombre: z.string().min(1),
  calorias: z.number().nullable().optional(),
});

export class AlimentosController {
  constructor(
    private readonly listAlimentos: ListAlimentos,
    private readonly createAlimento: CreateAlimento
  ) {}

  // GET /alimentos
  list = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const out = await this.listAlimentos.execute();
      res.json(out);
    } catch (e) {
      next(e);
    }
  };

  // POST /alimentos
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createSchema.parse(req.body);
      const input = {
        ...data,
        calorias: data.calorias === undefined ? null : data.calorias,
      };
      const out = await this.createAlimento.execute(input);
      res.status(201).json(out);
    } catch (e) {
      next(e);
    }
  };
}
