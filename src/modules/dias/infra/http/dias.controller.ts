import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  CreateDia, ListDiasByUsuario, CloseDia,
  AddComida, ListComidasDeDia, AddAlimentoAComida, RemoveAlimentoDeComida
} from "../../application/dias.usecase";

const createDiaSchema = z.object({
  usuario_id: z.string().uuid(),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  estado_animo_inicio_id: z.number().int().positive(),
  notas: z.string().optional().nullable(),
});

const listDiasSchema = z.object({
  usuario_id: z.string().uuid(),
  desde: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  hasta: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

const closeDiaSchema = z.object({
  dia_id: z.string().uuid(),
  estado_animo_final_id: z.number().int().positive(),
});

const addComidaSchema = z.object({
  dia_id: z.string().uuid(),
  tipo_id: z.number().int().positive(),
  hora: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/).optional(),
});

const addConsumoSchema = z.object({
  comida_id: z.string().uuid(),
  alimento_id: z.string().uuid(),
  cantidad: z.number().positive(),
  unidad: z.string().min(1),
});

export class DiasController {
  constructor(
    private readonly createDiaUC: CreateDia,
    private readonly listDiasUC: ListDiasByUsuario,
    private readonly closeDiaUC: CloseDia,
    private readonly addComidaUC: AddComida,
    private readonly listComidasUC: ListComidasDeDia,
    private readonly addConsumoUC: AddAlimentoAComida,
    private readonly removeConsumoUC: RemoveAlimentoDeComida
  ) {}

  createDia = async (req: Request, res: Response, next: NextFunction) => {
    try { const data = createDiaSchema.parse(req.body);
      const out = await this.createDiaUC.execute(data); res.status(201).json(out);
    } catch (e) { next(e); }
  };

  listDias = async (req: Request, res: Response, next: NextFunction) => {
    try { const q = listDiasSchema.parse(req.query);
      const out = await this.listDiasUC.execute(q.usuario_id, q.desde, q.hasta);
      res.json(out);
    } catch (e) { next(e); }
  };

  closeDia = async (req: Request, res: Response, next: NextFunction) => {
    try { const data = closeDiaSchema.parse(req.body);
      const out = await this.closeDiaUC.execute(data); res.json(out);
    } catch (e) { next(e); }
  };

  addComida = async (req: Request, res: Response, next: NextFunction) => {
    try { const data = addComidaSchema.parse(req.body);
      const out = await this.addComidaUC.execute(data); res.status(201).json(out);
    } catch (e) { next(e); }
  };

  listComidas = async (req: Request, res: Response, next: NextFunction) => {
    try { const dia_id = z.string().uuid().parse(req.params.diaId);
      const out = await this.listComidasUC.execute(dia_id); res.json(out);
    } catch (e) { next(e); }
  };

  addConsumo = async (req: Request, res: Response, next: NextFunction) => {
    try { const data = addConsumoSchema.parse(req.body);
      const out = await this.addConsumoUC.execute(data); res.status(201).json(out);
    } catch (e) { next(e); }
  };

  removeConsumo = async (req: Request, res: Response, next: NextFunction) => {
    try { const consumo_id = z.string().uuid().parse(req.params.consumoId);
      await this.removeConsumoUC.execute(consumo_id); res.status(204).end();
    } catch (e) { next(e); }
  };
}
