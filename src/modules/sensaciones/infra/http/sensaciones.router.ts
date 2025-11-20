import { Router } from "express";
import { SensacionesController } from "./sensaciones.controller";

export function buildSensacionesRouter(ctrl: SensacionesController): Router {
    const r = Router();

    // COMIDA
    r.get("/comida/:comidaId", ctrl.getComida);
    r.post("/comida", ctrl.createComida);
    r.put("/comida/:comidaId", ctrl.updateComida);

    // PLATO
    r.get("/plato/:comidaPlatoId", ctrl.getPlato);
    r.post("/plato", ctrl.createPlato);
    r.put("/plato/:comidaPlatoId", ctrl.updatePlato);

    // ALIMENTO (consumo)
    r.get("/consumo/:consumoId", ctrl.getAlimento);
    r.post("/consumo", ctrl.createAlimento);
    r.put("/consumo/:consumoId", ctrl.updateAlimento);

    // SINTOMAS 
    r.get("/sintomas", ctrl.listSintomas);

    return r;
}
