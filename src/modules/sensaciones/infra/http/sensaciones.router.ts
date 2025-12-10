import { Router } from "express";
import { SensacionesController } from "./sensaciones.controller";

export function buildSensacionesRouter(ctrl: SensacionesController): Router {
    const r = Router();

    // COMIDA
    r.get("/comida/:comidaId", ctrl.getComida); // Obtener sensación de comida por ID
    r.post("/comida", ctrl.createComida); // Crear sensación de comida
    r.put("/comida/:comidaId", ctrl.updateComida); // Actualizar sensación de comida por ID

    // PLATO
    r.get("/plato/:comidaPlatoId", ctrl.getPlato); // Obtener sensación de plato por ID
    r.post("/plato", ctrl.createPlato); // Crear sensación de plato
    r.put("/plato/:comidaPlatoId", ctrl.updatePlato); // Actualizar sensación de plato por ID

    // ALIMENTO (consumo)
    r.get("/consumo/:consumoId", ctrl.getAlimento); // Obtener sensación de alimento por ID
    r.post("/consumo", ctrl.createAlimento); // Crear sensación de alimento
    r.put("/consumo/:consumoId", ctrl.updateAlimento); // Actualizar sensación de alimento por ID

    // SINTOMAS 
    r.get("/sintomas", ctrl.listSintomas); // Listar todos los síntomas

    return r;
}
