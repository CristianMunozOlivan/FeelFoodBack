import { Router } from "express";
import { PlatosController } from "./platos.controller";

export function buildPlatosRouter(ctrl: PlatosController): Router {
  const r = Router();

  r.get("/", ctrl.list);  // listado de platos del usuario autenticado
  r.post("/", ctrl.create); // crea un nuevo plato
  r.patch("/:platoId", ctrl.update); // actualiza un plato
  r.delete("/:platoId", ctrl.delete); // elimina un plato
  r.get("/:platoId/ingredientes", ctrl.listIngredientes); // lista ingredientes de un plato
  r.post("/:platoId/ingredientes", ctrl.addIngrediente); // añade un ingrediente a un plato
  r.delete("/ingredientes/:ingredienteId", ctrl.removeIngrediente); // elimina un ingrediente de un plato
  r.patch("/ingredientes/:ingredienteId", ctrl.updateIngrediente); // actualiza un ingrediente de un plato
  return r;
}
