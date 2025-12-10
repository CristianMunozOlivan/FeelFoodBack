import Dia from "./dia.entity";
import Comida from "./comida.entity";
import Consumo from "./consumo.entity";
import ComidaPlato from "./comidaPlato.entity";
// DTO para crear el día
export type CreateDiaDTO = {
  usuario_id: string;
  fecha: string; // YYYY-MM-DD
  estado_animo_inicio_id: number;
  notas?: string | null;
};
// DTO para cerrar el día
export type CloseDiaDTO = {
  dia_id: string;
  estado_animo_final_id: number;
};
// DTO para añadir comida al día
export type AddComidaDTO = {
  dia_id: string;
  tipo_id: number;
  hora?: string | null; // HH:mm:ss
};
// DTO para añadir consumo a la comida
export type AddConsumoDTO = {
  comida_id: string;
  alimento_id: string;
  cantidad: number;
  unidad: string;
  comida_plato_id?: string | null;
};
// DTO para añadir plato a la comida
export type AddComidaPlatoDTO = {
  comida_id: string;
  plato_id: string;
  multiplicador?: number; // por defecto 1
};
// Puerto del repositorio de Días
export interface DiaRepository {
  createDia(input: CreateDiaDTO): Promise<Dia>;
  listDiasByUsuario(usuario_id: string, desde?: string, hasta?: string): Promise<Dia[]>;
  closeDia(input: CloseDiaDTO): Promise<Dia | null>;

  addComida(input: AddComidaDTO): Promise<Comida>;
  addComidaPlato(input: AddComidaPlatoDTO): Promise<ComidaPlato>;
  listComidasByDia(dia_id: string): Promise<Comida[]>;
  listComidaPlatosByComida(comida_id: string): Promise<ComidaPlato[]>;

  addConsumo(input: AddConsumoDTO): Promise<Consumo>;
  removeConsumo(consumo_id: string): Promise<void>;
}
