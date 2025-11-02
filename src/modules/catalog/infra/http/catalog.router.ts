import { Router } from "express";
import { CatalogController } from "./catalog.controller";

export function buildCatalogRouter(ctrl: CatalogController): Router {
  const r = Router();
  r.get("/estados-animo", ctrl.estadosAnimo);
  r.get("/tipos-comida", ctrl.tiposComida);
  return r;
}
