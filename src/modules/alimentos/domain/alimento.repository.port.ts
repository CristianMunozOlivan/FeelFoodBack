import Alimento from "./alimento.entity";

export type CreateAlimentoDTO = {
  nombre: string;
  calorias: number | null;
};

export interface AlimentoRepository {
  list(): Promise<Alimento[]>;
  create(input: CreateAlimentoDTO): Promise<Alimento>;
}
