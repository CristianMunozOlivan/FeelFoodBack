import { Router } from "express";
import { DiasController } from "./dias.controller";

export function buildDiasRouter(ctrl: DiasController): Router {
  const r = Router();

  r.post("/", ctrl.createDia);                 // Crear día
  r.get("/", ctrl.listDias);                   // Listar días por usuario (query)
  r.patch("/close", ctrl.closeDia);            // Cerrar día (estado_final)

  r.post("/comidas", ctrl.addComida);          // Añadir comida a un día
  r.get("/:diaId/comidas", ctrl.listComidas);  // Listar comidas de un día

  r.post("/consumos", ctrl.addConsumo);        // Añadir consumo a una comida
  r.delete("/consumos/:consumoId", ctrl.removeConsumo); // Eliminar consumo

  return r;
}
