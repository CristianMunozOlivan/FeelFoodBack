import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  ListPlatos, CreatePlato,
  AddIngredientePlato, ListIngredientesPlato, RemoveIngredientePlato,
  UpdatePlato,
  DeletePlato,
  UpdateIngredientePlato
} from "../../application/plato.usecases";

// ──────────────────────────────────────────────────────────
// Schemas
// ──────────────────────────────────────────────────────────
const createSchema = z.object({
  nombre: z.string().min(1),
});

const updateSchema = z.object({
  nombre: z.string().min(1),
});

// params: usamos 'platoId' porque así lo tienes en tu router actual
const platoIdParamSchema = z.object({ platoId: z.string().uuid() });

// body para añadir ingrediente (SIN plato_id; viene del path)
const addIngBodySchema = z.object({
  alimento_id: z.string().uuid(),
  cantidad: z.number().positive(),
  unidad: z.string().min(1),
});

export class PlatosController {
  constructor(
    private readonly listPlatosUC: ListPlatos,
    private readonly createPlatoUC: CreatePlato,
    private readonly updatePlatoUC: UpdatePlato,
    private readonly deletePlatoUC: DeletePlato,
    private readonly addIngUC: AddIngredientePlato,
    private readonly listIngUC: ListIngredientesPlato,
    private readonly removeIngUC: RemoveIngredientePlato,
    private readonly updateIngUC: UpdateIngredientePlato
  ) {}

  // GET /platos
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuario_id = (req as any).user.id as string;
      const out = await this.listPlatosUC.execute(usuario_id);
      res.json(out);
    } catch (e) {
      next(e);
    }
  };

  // POST /platos
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuario_id = (req as any).user.id as string;
      const { nombre } = createSchema.parse(req.body ?? {});
      const out = await this.createPlatoUC.execute({ usuario_id, nombre });
      res.status(201).json(out);
    } catch (e) {
      next(e);
    }
  };

  // PATCH /platos/:platoId
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuario_id = (req as any).user.id as string;
      const { platoId } = platoIdParamSchema.parse(req.params);
      const { nombre } = updateSchema.parse(req.body ?? {});
      const out = await this.updatePlatoUC.execute({
        plato_id: platoId,
        usuario_id,
        nombre,
      });
      res.json(out);
    } catch (e) { next(e); }
  };

  // DELETE /platos/:platoId
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { platoId } = platoIdParamSchema.parse(req.params);
      const usuario_id = (req as any).user.id as string;
      await this.deletePlatoUC.execute(platoId, usuario_id);
      res.status(204).end();
    } catch (e) { next(e); }
  };

  // POST /platos/:platoId/ingredientes
  addIngrediente = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { platoId } = platoIdParamSchema.parse(req.params);
      const { alimento_id, cantidad, unidad } = addIngBodySchema.parse(req.body ?? {});
      const out = await this.addIngUC.execute({ plato_id: platoId, alimento_id, cantidad, unidad });
      res.status(201).json(out);
    } catch (e) { next(e); }
  };

  // GET /platos/:platoId/ingredientes
  listIngredientes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { platoId } = platoIdParamSchema.parse(req.params);
      const out = await this.listIngUC.execute(platoId);
      res.json(out);
    } catch (e) { next(e); }
  };

  // DELETE /platos/ingredientes/:ingredienteId
  removeIngrediente = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ingrediente_id = z.string().uuid().parse(req.params.ingredienteId);
      await this.removeIngUC.execute(ingrediente_id);
      res.status(204).end();
    } catch (e) { next(e); }
  };

  // PATCH /platos/ingredientes/:ingredienteId
  updateIngrediente = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ingrediente_id = z.string().uuid().parse(req.params.ingredienteId);
      const input = z.object({
        cantidad: z.number().positive(),
        unidad: z.string().min(1),
      }).parse(req.body ?? {});
      const out = await this.updateIngUC.execute(ingrediente_id, input);
      res.json(out);
    } catch (e) { next(e); }
  };
}