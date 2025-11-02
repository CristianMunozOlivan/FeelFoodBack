import { Router } from "express";
import { PlatosController } from "./platos.controller";

export function buildPlatosRouter(ctrl: PlatosController): Router {
  const r = Router();

  r.get("/", ctrl.list);                                  // ?usuario_id=...
  r.post("/", ctrl.create);
  r.get("/:platoId/ingredientes", ctrl.listIngredientes);
  r.post("/ingredientes", ctrl.addIngrediente);
  r.delete("/ingredientes/:ingredienteId", ctrl.removeIngrediente);

  return r;
}
