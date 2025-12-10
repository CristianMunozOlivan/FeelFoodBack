import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  CreateAlimento,
  ListAlimentos,
  DeleteAlimento,
  UpdateAlimento,
} from "../../application/alimento.useCase";

// Validacion para id
const idSchema = z.object({
  id: z.string().uuid("id debe ser un UUID válido"),
});
// Validación para el create
const createSchema = z.object({
  nombre: z.string().min(1, "nombre es obligatorio"),
  calorias: z.number().nullable().optional(),
});

// Validación para el update (al menos un campo)
const updateSchema = z
  .object({
    nombre: z.string().min(1).optional(),
    calorias: z.number().nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo a actualizar",
  });

// Controlador de Alimentos
export class AlimentosController {
  constructor(
    private readonly listAlimentos: ListAlimentos,
    private readonly createAlimento: CreateAlimento,
    private readonly deleteAlimento: DeleteAlimento,
    private readonly updateAlimento: UpdateAlimento
  ) {}

  // GET /alimentos
  // Lista todos los alimentos
  list = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const out = await this.listAlimentos.execute();
      res.json(out);
    } catch (e) {
      next(e);
    }
  };

  // POST /alimentos
  // Crea un nuevo alimento
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createSchema.parse(req.body);
      const input = {
        ...data,
        // normaliza a null si viene undefined
        calorias: data.calorias === undefined ? null : data.calorias,
      };
      const out = await this.createAlimento.execute(input);
      res.status(201).json(out);
    } catch (e) {
      next(e);
    }
  };

  // DELETE /alimentos/:id
  // Elimina un alimento por su ID
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = idSchema.parse(req.params);
      await this.deleteAlimento.execute(id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  };

  // PUT /alimentos/:id
  // Actualiza un alimento por su ID
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = idSchema.parse(req.params);
      const data = updateSchema.parse(req.body);
      console.log(data);
      console.log(id);
      // normaliza calorías a null si no viene (mantiene la coherencia del DTO)
      if (typeof data.nombre !== "string") {
        throw new Error("El campo 'nombre' es obligatorio y debe ser un string");
      }
      const input = {
        nombre: data.nombre,
        calorias: data.calorias!,
      };

      const out = await this.updateAlimento.execute(id, input);
      res.json(out);
    } catch (e) {
      next(e);
    }
  };
}
