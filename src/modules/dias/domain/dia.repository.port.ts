import Dia from "./dia.entity";
import Comida from "./comida.entity";
import Consumo from "./consumo.entity";

export type CreateDiaDTO = {
  usuario_id: string;
  fecha: string; // YYYY-MM-DD
  estado_animo_inicio_id: number;
  notas?: string | null;
};

export type CloseDiaDTO = {
  dia_id: string;
  estado_animo_final_id: number;
};

export type AddComidaDTO = {
  dia_id: string;
  tipo_id: number;
  hora?: string | null; // HH:mm:ss
};

export type AddConsumoDTO = {
  comida_id: string;
  alimento_id: string;
  cantidad: number;
  unidad: string;
};

export interface DiaRepository {
  createDia(input: CreateDiaDTO): Promise<Dia>;
  listDiasByUsuario(usuario_id: string, desde?: string, hasta?: string): Promise<Dia[]>;
  closeDia(input: CloseDiaDTO): Promise<Dia | null>;

  addComida(input: AddComidaDTO): Promise<Comida>;
  listComidasByDia(dia_id: string): Promise<Comida[]>;

  addConsumo(input: AddConsumoDTO): Promise<Consumo>;
  removeConsumo(consumo_id: string): Promise<void>;
}
