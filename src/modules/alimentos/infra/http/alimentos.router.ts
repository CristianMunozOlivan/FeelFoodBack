import { Router } from "express";
import { AlimentosController } from "./alimentos.controller";

export function buildAlimentosRouter(ctrl: AlimentosController): Router {
  const r = Router();
  r.get("/list", ctrl.list);
  r.post("/create", ctrl.create);
  r.patch("/:id", ctrl.update);
  r.delete("/:id", ctrl.delete);
  return r;
}
