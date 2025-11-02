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

export interface PlatoRepository {
  listByUsuario(usuario_id: string): Promise<Plato[]>;
  create(input: CreatePlatoDTO): Promise<Plato>;

  addIngrediente(input: AddIngredienteDTO): Promise<PlatoIngrediente>;
  listIngredientes(plato_id: string): Promise<PlatoIngrediente[]>;
  removeIngrediente(ingrediente_id: string): Promise<void>;
}
