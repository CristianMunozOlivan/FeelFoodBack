import { Router } from "express";
import { AlimentosController } from "./alimentos.controller";

// Router de Alimentos
// Define las rutas y las asocia con los métodos del controlador
export function buildAlimentosRouter(ctrl: AlimentosController): Router {
  const r = Router();
  r.get("/list", ctrl.list); // Lista todos los alimentos
  r.post("/create", ctrl.create); // Crea un nuevo alimento
  r.patch("/:id", ctrl.update); // Actualiza un alimento por su ID
  r.delete("/:id", ctrl.delete); // Elimina un alimento por su ID
  return r;
}
