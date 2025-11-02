import { Router } from "express";
import { AlimentosController } from "./alimentos.controller";

export function buildAlimentosRouter(ctrl: AlimentosController): Router {
  const r = Router();
  r.get("/", ctrl.list);
  r.post("/", ctrl.create);
  return r;
}
