import SensacionComida from "./sensacionComida.entity";
import SensacionPlato from "./sensacionPlato.entity";
import SensacionAlimento from "./sensacionAlimento.entity";
import Sintoma from "./sintoma.entity";
// Input para crear y actualizar sensación de comida
export type SensacionComidaCreateInput = {
  comida_id: string;
  estado_animo_id?: number | null;
  saciedad?: number | null;
  energia?: number | null;
  sintomas?: number[] | null;
  notas?: string | null;
};
// Input para actualizar sensación de comida
export type SensacionComidaUpdateInput = {
  estado_animo_id?: number | null;
  saciedad?: number | null;
  energia?: number | null;
  sintomas?: number[] | null;
  notas?: string | null;
};
// Input para crear y actualizar sensación de plato
export type SensacionPlatoCreateInput = {
  comida_plato_id: string;
  tolerancia?: number | null;
  sintomas?: number[] | null;
  notas?: string | null;
};
// Input para actualizar sensación de plato
export type SensacionPlatoUpdateInput = {
  tolerancia?: number | null;
  sintomas?: number[] | null;
  notas?: string | null;
};
// Input para crear y actualizar sensación de alimento (consumo)
export type SensacionAlimentoCreateInput = {
  alimento_consumido_id: string;
  tolerancia?: number | null;
  sintomas?: number[] | null;
  notas?: string | null;
};
// Input para actualizar sensación de alimento (consumo)
export type SensacionAlimentoUpdateInput = {
  tolerancia?: number | null;
  sintomas?: number[] | null;
  notas?: string | null;
};
// Puerto del repositorio de Sensaciones
export interface SensacionesRepository {
  createSensacionComida(input: SensacionComidaCreateInput): Promise<SensacionComida>;
  updateSensacionComidaByComidaId(
    comida_id: string,
    input: SensacionComidaUpdateInput
  ): Promise<SensacionComida | null>;
  findSensacionComidaByComidaId(comida_id: string): Promise<SensacionComida | null>;
  createSensacionPlato(input: SensacionPlatoCreateInput): Promise<SensacionPlato>;
  updateSensacionPlatoByComidaPlatoId(
    comida_plato_id: string,
    input: SensacionPlatoUpdateInput
  ): Promise<SensacionPlato | null>;
  findSensacionPlatoByComidaPlatoId(comida_plato_id: string): Promise<SensacionPlato | null>;
  createSensacionAlimento(input: SensacionAlimentoCreateInput): Promise<SensacionAlimento>;
  updateSensacionAlimentoByConsumoId(
    alimento_consumido_id: string,
    input: SensacionAlimentoUpdateInput
  ): Promise<SensacionAlimento | null>;
  findSensacionAlimentoByConsumoId(alimento_consumido_id: string): Promise<SensacionAlimento | null>;
  listSintomas(): Promise<Sintoma[]>;
  findSintomasByIds(ids: number[]): Promise<Sintoma[]>;
}

