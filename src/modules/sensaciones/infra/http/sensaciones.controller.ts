import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  GetSensacionComida,
  CreateSensacionComida,
  UpdateSensacionComida,
  GetSensacionPlato,
  CreateSensacionPlato,
  UpdateSensacionPlato,
  GetSensacionAlimento,
  CreateSensacionAlimento,
  UpdateSensacionAlimento,
  ListSintomas,
} from "../../application/sensaciones.useCase";

// Validacion de comidaId
const comidaIdParamSchema = z.object({
  comidaId: z.string().uuid(),
});
// Validacion de comidaPlatoId
const platoIdParamSchema = z.object({
  comidaPlatoId: z.string().uuid(),
});
// Validacion de consumoId
const consumoIdParamSchema = z.object({
  consumoId: z.string().uuid(),
});
// Validación para el create de comida
const createComidaBody = z.object({
  comida_id: z.string().uuid(),
  estado_animo_id: z.coerce.number().int().optional().nullable(),
  saciedad: z.coerce.number().int().optional().nullable(),
  energia: z.coerce.number().int().optional().nullable(),
  sintomas: z.array(z.coerce.number().int()).optional().nullable(),
  notas: z.string().optional().nullable(),
});
// Validación para el update de comida
const updateComidaBody = z.object({
  estado_animo_id: z.coerce.number().int().optional().nullable(),
  saciedad: z.coerce.number().int().optional().nullable(),
  energia: z.coerce.number().int().optional().nullable(),
  sintomas: z.array(z.coerce.number().int()).optional().nullable(),
  notas: z.string().optional().nullable(),
});
// Validación para el create de plato
const createPlatoBody = z.object({
  comida_plato_id: z.string().uuid(),
  tolerancia: z.coerce.number().int().optional().nullable(),
  sintomas: z.array(z.coerce.number().int()).optional().nullable(),
  notas: z.string().optional().nullable(),
});
// Validación para el update de plato
const updatePlatoBody = z.object({
  tolerancia: z.coerce.number().int().optional().nullable(),
  sintomas: z.array(z.coerce.number().int()).optional().nullable(),
  notas: z.string().optional().nullable(),
});
// Validación para el create de alimento (consumo)
const createAlimentoBody = z.object({
  alimento_consumido_id: z.string().uuid(),
  tolerancia: z.coerce.number().int().optional().nullable(),
  sintomas: z.array(z.coerce.number().int()).optional().nullable(),
  notas: z.string().optional().nullable(),
});
// Validación para el update de alimento (consumo)
const updateAlimentoBody = z.object({
  tolerancia: z.coerce.number().int().optional().nullable(),
  sintomas: z.array(z.coerce.number().int()).optional().nullable(),
  notas: z.string().optional().nullable(),
});
// Controlador de Sensaciones
export class SensacionesController {
  constructor(
    private readonly getComidaUC: GetSensacionComida,
    private readonly createComidaUC: CreateSensacionComida,
    private readonly updateComidaUC: UpdateSensacionComida,
    private readonly getPlatoUC: GetSensacionPlato,
    private readonly createPlatoUC: CreateSensacionPlato,
    private readonly updatePlatoUC: UpdateSensacionPlato,
    private readonly getAlimentoUC: GetSensacionAlimento,
    private readonly createAlimentoUC: CreateSensacionAlimento,
    private readonly updateAlimentoUC: UpdateSensacionAlimento,
    private readonly listSintomasUC: ListSintomas,
  ) {}
  // Obetener sensación de comida por comida_id
  getComida = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comidaId } = comidaIdParamSchema.parse(req.params);
      const sensacion = await this.getComidaUC.execute(comidaId);
      res.json(sensacion);
    } catch (e) {
      next(e);
    }
  };
  // Crear sensación de comida
  createComida = async (req: Request, res: Response, next: NextFunction) => {
    console.log("createComida called");
    try {
      const data = createComidaBody.parse(req.body ?? {});
      const sensacion = await this.createComidaUC.execute({
        comida_id: data.comida_id,
        estado_animo_id: data.estado_animo_id ?? null,
        saciedad: data.saciedad ?? null,
        energia: data.energia ?? null,
        sintomas: data.sintomas ?? null,
        notas: data.notas ?? null,
      });
      res.status(201).json(sensacion);
    } catch (e) {
      next(e);
    }
  };
  /// Actualizar sensación de comida
  updateComida = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comidaId } = comidaIdParamSchema.parse(req.params);
      const data = updateComidaBody.parse(req.body ?? {});
      const sensacion = await this.updateComidaUC.execute(comidaId, {
        estado_animo_id: data.estado_animo_id ?? null,
        saciedad: data.saciedad ?? null,
        energia: data.energia ?? null,
        sintomas: data.sintomas ?? null,
        notas: data.notas ?? null,
      });
      res.json(sensacion);
    } catch (e) {
      next(e);
    }
  };

  // Obtener sensación de plato por comida_plato_id
  getPlato = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comidaPlatoId } = platoIdParamSchema.parse(req.params);
      const sensacion = await this.getPlatoUC.execute(comidaPlatoId);
      res.json(sensacion);
    } catch (e) {
      next(e);
    }
  };
  // Crear sensación de plato
  createPlato = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createPlatoBody.parse(req.body ?? {});
      const sensacion = await this.createPlatoUC.execute({
        comida_plato_id: data.comida_plato_id,
        tolerancia: data.tolerancia ?? null,
        sintomas: data.sintomas ?? null,
        notas: data.notas ?? null,
      });
      res.status(201).json(sensacion);
    } catch (e) {
      next(e);
    }
  };
  // Actualizar sensación de plato
  updatePlato = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comidaPlatoId } = platoIdParamSchema.parse(req.params);
      const data = updatePlatoBody.parse(req.body ?? {});
      const sensacion = await this.updatePlatoUC.execute(comidaPlatoId, {
        tolerancia: data.tolerancia ?? null,
        sintomas: data.sintomas ?? null,
        notas: data.notas ?? null,
      });
      res.json(sensacion);
    } catch (e) {
      next(e);
    }
  };

  // Obtener sensación de alimento por alimento_consumido_id
  getAlimento = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { consumoId } = consumoIdParamSchema.parse(req.params);
      const sensacion = await this.getAlimentoUC.execute(consumoId);
      res.json(sensacion);
    } catch (e) {
      next(e);
    }
  };
  // Crear sensación de alimento
  createAlimento = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createAlimentoBody.parse(req.body ?? {});
      const sensacion = await this.createAlimentoUC.execute({
        alimento_consumido_id: data.alimento_consumido_id,
        tolerancia: data.tolerancia ?? null,
        sintomas: data.sintomas ?? null,
        notas: data.notas ?? null,
      });
      res.status(201).json(sensacion);
    } catch (e) {
      next(e);
    }
  };
  // Actualizar sensación de alimento
  updateAlimento = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { consumoId } = consumoIdParamSchema.parse(req.params);
      const data = updateAlimentoBody.parse(req.body ?? {});
      const sensacion = await this.updateAlimentoUC.execute(consumoId, {
        tolerancia: data.tolerancia ?? null,
        sintomas: data.sintomas ?? null,
        notas: data.notas ?? null,
      });
      res.json(sensacion);
    } catch (e) {
      next(e);
    }
  };
  // Listar todos los síntomas
    listSintomas = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const sintomas = await this.listSintomasUC.execute();
        res.json(sintomas);
    } catch (e) {
        next(e);
    }
  };
}


