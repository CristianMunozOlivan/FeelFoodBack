import { Router } from "express";
import { CatalogController } from "./catalog.controller";
// Construye el router de catálogo
export function buildCatalogRouter(ctrl: CatalogController): Router {
  const r = Router();
  r.get("/estados-animo", ctrl.estadosAnimo); // Lista estados de ánimo
  r.get("/tipos-comida", ctrl.tiposComida); // Lista tipos de comida
  return r;
}
