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

// Schemas
const comidaIdParamSchema = z.object({
  comidaId: z.string().uuid(),
});

const platoIdParamSchema = z.object({
  comidaPlatoId: z.string().uuid(),
});

const consumoIdParamSchema = z.object({
  consumoId: z.string().uuid(),
});

const createComidaBody = z.object({
  comida_id: z.string().uuid(),
  estado_animo_id: z.coerce.number().int().optional().nullable(),
  saciedad: z.coerce.number().int().optional().nullable(),
  energia: z.coerce.number().int().optional().nullable(),
  sintomas: z.array(z.coerce.number().int()).optional().nullable(),
  notas: z.string().optional().nullable(),
});

const updateComidaBody = z.object({
  estado_animo_id: z.coerce.number().int().optional().nullable(),
  saciedad: z.coerce.number().int().optional().nullable(),
  energia: z.coerce.number().int().optional().nullable(),
  sintomas: z.array(z.coerce.number().int()).optional().nullable(),
  notas: z.string().optional().nullable(),
});

const createPlatoBody = z.object({
  comida_plato_id: z.string().uuid(),
  tolerancia: z.coerce.number().int().optional().nullable(),
  sintomas: z.array(z.coerce.number().int()).optional().nullable(),
  notas: z.string().optional().nullable(),
});

const updatePlatoBody = z.object({
  tolerancia: z.coerce.number().int().optional().nullable(),
  sintomas: z.array(z.coerce.number().int()).optional().nullable(),
  notas: z.string().optional().nullable(),
});

const createAlimentoBody = z.object({
  alimento_consumido_id: z.string().uuid(),
  tolerancia: z.coerce.number().int().optional().nullable(),
  sintomas: z.array(z.coerce.number().int()).optional().nullable(),
  notas: z.string().optional().nullable(),
});

const updateAlimentoBody = z.object({
  tolerancia: z.coerce.number().int().optional().nullable(),
  sintomas: z.array(z.coerce.number().int()).optional().nullable(),
  notas: z.string().optional().nullable(),
});

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

  // COMIDA

  getComida = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comidaId } = comidaIdParamSchema.parse(req.params);
      const out = await this.getComidaUC.execute(comidaId);
      res.json(out);
    } catch (e) {
      next(e);
    }
  };

  createComida = async (req: Request, res: Response, next: NextFunction) => {
    console.log("createComida called");
    try {
      const data = createComidaBody.parse(req.body ?? {});
      const out = await this.createComidaUC.execute({
        comida_id: data.comida_id,
        estado_animo_id: data.estado_animo_id ?? null,
        saciedad: data.saciedad ?? null,
        energia: data.energia ?? null,
        sintomas: data.sintomas ?? null,
        notas: data.notas ?? null,
      });
      res.status(201).json(out);
    } catch (e) {
      next(e);
    }
  };

  updateComida = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comidaId } = comidaIdParamSchema.parse(req.params);
      const data = updateComidaBody.parse(req.body ?? {});
      const out = await this.updateComidaUC.execute(comidaId, {
        estado_animo_id: data.estado_animo_id ?? null,
        saciedad: data.saciedad ?? null,
        energia: data.energia ?? null,
        sintomas: data.sintomas ?? null,
        notas: data.notas ?? null,
      });
      res.json(out);
    } catch (e) {
      next(e);
    }
  };

  // PLATO

  getPlato = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comidaPlatoId } = platoIdParamSchema.parse(req.params);
      const out = await this.getPlatoUC.execute(comidaPlatoId);
      res.json(out);
    } catch (e) {
      next(e);
    }
  };

  createPlato = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createPlatoBody.parse(req.body ?? {});
      const out = await this.createPlatoUC.execute({
        comida_plato_id: data.comida_plato_id,
        tolerancia: data.tolerancia ?? null,
        sintomas: data.sintomas ?? null,
        notas: data.notas ?? null,
      });
      res.status(201).json(out);
    } catch (e) {
      next(e);
    }
  };

  updatePlato = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comidaPlatoId } = platoIdParamSchema.parse(req.params);
      const data = updatePlatoBody.parse(req.body ?? {});
      const out = await this.updatePlatoUC.execute(comidaPlatoId, {
        tolerancia: data.tolerancia ?? null,
        sintomas: data.sintomas ?? null,
        notas: data.notas ?? null,
      });
      res.json(out);
    } catch (e) {
      next(e);
    }
  };

  // ALIMENTO (consumo)

  getAlimento = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { consumoId } = consumoIdParamSchema.parse(req.params);
      const out = await this.getAlimentoUC.execute(consumoId);
      res.json(out);
    } catch (e) {
      next(e);
    }
  };

  createAlimento = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createAlimentoBody.parse(req.body ?? {});
      const out = await this.createAlimentoUC.execute({
        alimento_consumido_id: data.alimento_consumido_id,
        tolerancia: data.tolerancia ?? null,
        sintomas: data.sintomas ?? null,
        notas: data.notas ?? null,
      });
      res.status(201).json(out);
    } catch (e) {
      next(e);
    }
  };

  updateAlimento = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { consumoId } = consumoIdParamSchema.parse(req.params);
      const data = updateAlimentoBody.parse(req.body ?? {});
      const out = await this.updateAlimentoUC.execute(consumoId, {
        tolerancia: data.tolerancia ?? null,
        sintomas: data.sintomas ?? null,
        notas: data.notas ?? null,
      });
      res.json(out);
    } catch (e) {
      next(e);
    }
  };

    listSintomas = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const out = await this.listSintomasUC.execute();
        res.json(out);
    } catch (e) {
        next(e);
    }
  };
}


