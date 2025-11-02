import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  ListPlatos, CreatePlato,
  AddIngredientePlato, ListIngredientesPlato, RemoveIngredientePlato
} from "../../application/plato.usecases";

const listSchema = z.object({ usuario_id: z.string().uuid() }); // query
const createSchema = z.object({
  usuario_id: z.string().uuid(),
  nombre: z.string().min(1),
});
const addIngSchema = z.object({
  plato_id: z.string().uuid(),
  alimento_id: z.string().uuid(),
  cantidad: z.number().positive(),
  unidad: z.string().min(1),
});

export class PlatosController {
  constructor(
    private readonly listPlatosUC: ListPlatos,
    private readonly createPlatoUC: CreatePlato,
    private readonly addIngUC: AddIngredientePlato,
    private readonly listIngUC: ListIngredientesPlato,
    private readonly removeIngUC: RemoveIngredientePlato
  ) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const q = listSchema.parse(req.query);
      const out = await this.listPlatosUC.execute(q.usuario_id);
      res.json(out);
    } catch (e) { next(e); }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createSchema.parse(req.body);
      const out = await this.createPlatoUC.execute(data);
      res.status(201).json(out);
    } catch (e) { next(e); }
  };

  addIngrediente = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = addIngSchema.parse(req.body);
      const out = await this.addIngUC.execute(data);
      res.status(201).json(out);
    } catch (e) { next(e); }
  };

  listIngredientes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plato_id = z.string().uuid().parse(req.params.platoId);
      const out = await this.listIngUC.execute(plato_id);
      res.json(out);
    } catch (e) { next(e); }
  };

  removeIngrediente = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ingrediente_id = z.string().uuid().parse(req.params.ingredienteId);
      await this.removeIngUC.execute(ingrediente_id);
      res.status(204).end();
    } catch (e) { next(e); }
  };
}
