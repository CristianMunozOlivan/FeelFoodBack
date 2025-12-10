import type { SintomaDTO } from "./sintoma.entity";
// DTO para la sensación de comida
export type SensacionComidaDTO = {
  id: string;
  comida_id: string;
  estado_animo_id: number | null;
  saciedad: number | null;
  energia: number | null;
  sintomas: SintomaDTO[] | null;
  notas: string | null;
  creado_en: string;
};
// Definición de la entidad SensacionComida y su DTO
export default class SensacionComida {
  constructor(
    public id: string,
    public comida_id: string,
    public estado_animo_id: number | null,
    public saciedad: number | null,
    public energia: number | null,
    public sintomas: number[] | null,
    public notas: string | null,
    public creado_en: string,
  ) {}
  // Convierte una fila de BD en una entidad SensacionComida
  static fromRow(row: any): SensacionComida {
    return new SensacionComida(
      row.id,
      row.comida_id,
      row.estado_animo_id !== null ? Number(row.estado_animo_id) : null,
      row.saciedad !== null ? Number(row.saciedad) : null,
      row.energia !== null ? Number(row.energia) : null,
      Array.isArray(row.sintomas) ? row.sintomas.map((sintoma: any) => Number(sintoma)) : null,
      row.notas ?? null,
      row.creado_en,
    );
  }
  // Convierte la entidad SensacionComida en un DTO
  toDTO(sintomasDetallados: SintomaDTO[] | null): SensacionComidaDTO {
    return {
      id: this.id,
      comida_id: this.comida_id,
      estado_animo_id: this.estado_animo_id,
      saciedad: this.saciedad,
      energia: this.energia,
      sintomas: sintomasDetallados,
      notas: this.notas,
      creado_en: this.creado_en,
    };
  }
}
