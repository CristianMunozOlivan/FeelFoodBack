import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  CreateDia, ListDiasByUsuario, CloseDia,
  AddComida, ListComidasDeDia, AddAlimentoAComida, RemoveAlimentoDeComida,
  AddPlatoAComida,
  ListComidaPlatosDeComida
} from "../../application/dias.usecase";

// ──────────────────────────────────────────────────────────
// Schemas (coinciden con tu SQL/DTOs)
// ──────────────────────────────────────────────────────────
const createDiaSchema = z.object({
  usuario_id: z.string().uuid(),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  estado_animo_inicio_id: z.coerce.number().int().positive(),
  notas: z.string().optional().nullable(),
});

const listDiasSchema = z.object({
  usuario_id: z.string().uuid(),
  desde: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  hasta: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

const closeDiaSchema = z.object({
  dia_id: z.string().uuid(),
  estado_animo_final_id: z.coerce.number().int().positive(),
});

const addComidaSchema = z.object({
  dia_id: z.string().uuid(),
  tipo_id: z.coerce.number().int().positive(),
  hora: z.string().optional(),
});

const listComidasParams = z.object({
  diaId: z.string().uuid(),
});

const addConsumoSchema = z.object({
  comida_id: z.string().uuid(),
  alimento_id: z.string().uuid(),
  cantidad: z.number().positive(),
  unidad: z.string().min(1),
});

const addPlatoParams = z.object({
  comidaId: z.string().uuid(),
});

const addPlatoBody = z.object({
  plato_id: z.string().uuid(),
  multiplicador: z.coerce.number().positive().optional(),
});

const listComidaPlatosParams = z.object({
  comidaId: z.string().uuid(),
});

export class DiasController {
  constructor(
    private readonly createDiaUC: CreateDia,
    private readonly listDiasUC: ListDiasByUsuario,
    private readonly closeDiaUC: CloseDia,
    private readonly addComidaUC: AddComida,
    private readonly listComidasUC: ListComidasDeDia,
    private readonly addConsumoUC: AddAlimentoAComida,
    private readonly removeConsumoUC: RemoveAlimentoDeComida,
    private readonly addPlatoUC: AddPlatoAComida,
    private readonly listComidaPlatosUC: ListComidaPlatosDeComida
  ) {}

  // POST /dias
  createDia = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = createDiaSchema.parse(req.body);
      const out = await this.createDiaUC.execute(data);
      res.status(201).json(out);
    } catch (e) { next(e); }
  };

  // GET /dias?usuario_id=...&desde=...&hasta=...
  listDias = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const q = listDiasSchema.parse(req.query);
      const out = await this.listDiasUC.execute(q.usuario_id, { desde: q.desde, hasta: q.hasta });
      res.json(out);
    } catch (e) { next(e); }
  };

  // PATCH /dias/close
  closeDia = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = closeDiaSchema.parse(req.body);
      const out = await this.closeDiaUC.execute(data);
      res.json(out);
    } catch (e) { next(e); }
  };

  // POST /comidas
  addComida = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = addComidaSchema.parse(req.body);
      const out = await this.addComidaUC.execute(data);
      res.status(201).json(out);
    } catch (e) { next(e); }
  };

  // GET /:diaId/comidas
  listComidas = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { diaId } = listComidasParams.parse(req.params);
      const out = await this.listComidasUC.execute(diaId);
      res.json(out);
    } catch (e) { next(e); }
  };

  // POST /consumos
  addConsumo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = addConsumoSchema.parse(req.body);
      const out = await this.addConsumoUC.execute(data);
      res.status(201).json(out);
    } catch (e) { next(e); }
  };

  // DELETE /consumos/:consumoId
  removeConsumo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const consumo_id = z.string().uuid().parse(req.params.consumoId);
      await this.removeConsumoUC.execute(consumo_id);
      res.status(204).end();
    } catch (e) { next(e); }
  };

   // GET /dias/comidas/:comidaId/platos-grupo
  listComidaPlatos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comidaId } = listComidaPlatosParams.parse(req.params);
      const out = await this.listComidaPlatosUC.execute(comidaId);
      res.json(out);
    } catch (e) { next(e); }
  };

  // POST /dias/comidas/:comidaId/platos
  addPlatoAComida = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comidaId } = addPlatoParams.parse(req.params);
      const { plato_id, multiplicador } = addPlatoBody.parse(req.body ?? {});
      const out = await this.addPlatoUC.execute({ comida_id: comidaId, plato_id, multiplicador });
      res.status(201).json(out);
    } catch (e) { next(e); }
  };
}
