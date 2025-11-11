import { Router } from "express";
import { PlatosController } from "./platos.controller";

export function buildPlatosRouter(ctrl: PlatosController): Router {
  const r = Router();

  r.get("/", ctrl.list);                                  // ?usuario_id=...
  r.post("/", ctrl.create);
  r.patch("/:platoId", ctrl.update);
  r.delete("/:platoId", ctrl.delete);                     // ?usuario_id=...
  r.get("/:platoId/ingredientes", ctrl.listIngredientes);
  r.post("/:platoId/ingredientes", ctrl.addIngrediente);
  r.delete("/ingredientes/:ingredienteId", ctrl.removeIngrediente);
  r.patch("/ingredientes/:ingredienteId", ctrl.updateIngrediente);
  return r;
}
