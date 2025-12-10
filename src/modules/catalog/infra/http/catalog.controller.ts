import { Request, Response, NextFunction } from "express";
import { ListEstadosAnimo, ListTiposComida } from "../../application/catalog.usecases";
// Controlador de Catálogo
export class CatalogController {
  constructor(
    private readonly listEstados: ListEstadosAnimo,
    private readonly listTipos: ListTiposComida
  ) {}
// GET /catalog/estados-animo
// Lista todos los estados de ánimo
  estadosAnimo = async (_: Request, res: Response, next: NextFunction) => {
    try { res.json(await this.listEstados.execute()); } catch (e) { next(e); }
  };
// GET /catalog/tipos-comida
// Lista todos los tipos de comida
  tiposComida = async (_: Request, res: Response, next: NextFunction) => {
    try { res.json(await this.listTipos.execute()); } catch (e) { next(e); }
  };
}
