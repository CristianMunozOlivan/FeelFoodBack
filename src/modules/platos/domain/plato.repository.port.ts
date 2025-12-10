import Plato from "./plato.entity";
import PlatoIngrediente from "./ingrediente.entity";
// DTO para crear un Plato
export type CreatePlatoDTO = {
  usuario_id: string;
  nombre: string;
};
// DTO para añadir un ingrediente a un Plato
export type AddIngredienteDTO = {
  plato_id: string;
  alimento_id: string;
  cantidad: number;
  unidad: string;
};
// DTO para actualizar un Plato
export type UpdatePlatoDTO = {
  plato_id: string;
  usuario_id: string;
  nombre: string;
};

// Puerto de repositorio para la entidad Plato
export interface PlatoRepository {
  listByUsuario(usuario_id: string): Promise<Plato[]>;
  create(input: CreatePlatoDTO): Promise<Plato>;
  update(input: UpdatePlatoDTO): Promise<Plato>;
  delete(plato_id: string, usuario_id: string): Promise<void>;

  addIngrediente(input: AddIngredienteDTO): Promise<PlatoIngrediente>;
  listIngredientes(plato_id: string): Promise<PlatoIngrediente[]>;
  removeIngrediente(ingrediente_id: string): Promise<void>;
  updateIngrediente(ingrediente_id: string, input: { cantidad: number; unidad: string }): Promise<PlatoIngrediente>;
}
