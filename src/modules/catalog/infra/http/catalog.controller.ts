import { Request, Response, NextFunction } from "express";
import { ListEstadosAnimo, ListTiposComida } from "../../application/catalog.usecases";

export class CatalogController {
  constructor(
    private readonly listEstados: ListEstadosAnimo,
    private readonly listTipos: ListTiposComida
  ) {}

  estadosAnimo = async (_: Request, res: Response, next: NextFunction) => {
    try { res.json(await this.listEstados.execute()); } catch (e) { next(e); }
  };

  tiposComida = async (_: Request, res: Response, next: NextFunction) => {
    try { res.json(await this.listTipos.execute()); } catch (e) { next(e); }
  };
}
