import Plato from "./plato.entity";
import PlatoIngrediente from "./ingrediente.entity";

export type CreatePlatoDTO = {
  usuario_id: string;
  nombre: string;
};

export type AddIngredienteDTO = {
  plato_id: string;
  alimento_id: string;
  cantidad: number;
  unidad: string;
};

export type UpdatePlatoDTO = {
  plato_id: string;
  usuario_id: string;
  nombre: string;
};


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
