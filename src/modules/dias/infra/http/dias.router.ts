import { Router } from "express";
import { DiasController } from "./dias.controller";

export function buildDiasRouter(ctrl: DiasController): Router {
  const r = Router();

  r.post("/", ctrl.createDia);                 // Crear día
  r.get("/", ctrl.listDias);                   // Listar días por usuario (query con desde/hasta opcionales)
  r.patch("/close", ctrl.closeDia);            // Cerrar día (estado_animo_final_id)

  r.post("/comidas", ctrl.addComida);          // Añadir comida a un día
  r.get("/:diaId/comidas", ctrl.listComidas);  // Listar comidas de un día (usa params)

  r.post("/consumos", ctrl.addConsumo);        // Añadir consumo a una comida
  r.delete("/consumos/:consumoId", ctrl.removeConsumo); // Eliminar consumo

  r.post("/comidas/:comidaId/platos", ctrl.addPlatoAComida);
  return r;
}
