import Alimento from "./alimento.entity";

// Definición del repositorio de Alimento
export type CreateAlimentoDTO = {
  nombre: string;
  calorias: number | null;
};
// Puerto del repositorio de Alimento
export interface AlimentoRepository {
  list(): Promise<Alimento[]>;
  getById(id: string): Promise<Alimento | null>;
  create(input: CreateAlimentoDTO): Promise<Alimento>;
  delete(id: string): Promise<boolean>;
  update(id: string, input: CreateAlimentoDTO): Promise<Alimento>;
}
