import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  ListPlatos, CreatePlato,
  AddIngredientePlato, ListIngredientesPlato, RemoveIngredientePlato,
  UpdatePlato,
  DeletePlato,
  UpdateIngredientePlato
} from "../../application/plato.usecases";

// Validacion creacion plato
const createSchema = z.object({
  nombre: z.string().min(1),
});
// Validacion actualizacion plato
const updateSchema = z.object({
  nombre: z.string().min(1),
});

// Validacion parametro platoId
const platoIdParamSchema = z.object({ platoId: z.string().uuid() });

// Validacion cuerpo para añadir ingrediente
const addIngBodySchema = z.object({
  alimento_id: z.string().uuid(),
  cantidad: z.number().positive(),
  unidad: z.string().min(1),
});

// Controlador de Platos
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
  // Lista platos del usuario autenticado
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuario_id = (req as any).user.id as string;
      const platos = await this.listPlatosUC.execute(usuario_id);
      res.json(platos);
    } catch (e) {
      next(e);
    }
  };

  // POST /platos
  // Crea un nuevo plato para el usuario autenticado
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuario_id = (req as any).user.id as string;
      const { nombre } = createSchema.parse(req.body ?? {});
      const plato = await this.createPlatoUC.execute({ usuario_id, nombre });
      res.status(201).json(plato);
    } catch (e) {
      next(e);
    }
  };

  // PATCH /platos/:platoId
  // Actualiza un plato del usuario autenticado
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuario_id = (req as any).user.id as string;
      const { platoId } = platoIdParamSchema.parse(req.params);
      const { nombre } = updateSchema.parse(req.body ?? {});
      const plato = await this.updatePlatoUC.execute({
        plato_id: platoId,
        usuario_id,
        nombre,
      });
      res.json(plato);
    } catch (e) { next(e); }
  };

  // DELETE /platos/:platoId
  // Elimina un plato del usuario autenticado
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { platoId } = platoIdParamSchema.parse(req.params);
      const usuario_id = (req as any).user.id as string;
      await this.deletePlatoUC.execute(platoId, usuario_id);
      res.status(204).end();
    } catch (e) { next(e); }
  };

  // POST /platos/:platoId/ingredientes
  // Añade un ingrediente a un plato
  addIngrediente = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { platoId } = platoIdParamSchema.parse(req.params);
      const { alimento_id, cantidad, unidad } = addIngBodySchema.parse(req.body ?? {});
      const ingrediente = await this.addIngUC.execute({ plato_id: platoId, alimento_id, cantidad, unidad });
      res.status(201).json(ingrediente);
    } catch (e) { next(e); }
  };

  // GET /platos/:platoId/ingredientes
  // Lista ingredientes de un plato
  listIngredientes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { platoId } = platoIdParamSchema.parse(req.params);
      const ingredientes = await this.listIngUC.execute(platoId);
      res.json(ingredientes);
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
      const ingrediente = await this.updateIngUC.execute(ingrediente_id, input);
      res.json(ingrediente);
    } catch (e) { next(e); }
  };
}