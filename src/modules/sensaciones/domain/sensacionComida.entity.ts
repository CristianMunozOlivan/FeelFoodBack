// src/modules/Sensaciones/domain/sensacionComida.entity.ts
import type { SintomaDTO } from "./sintoma.entity";

export type SensacionComidaDTO = {
  id: string;
  comida_id: string;
  estado_animo_id: number | null;
  saciedad: number | null;
  energia: number | null;
  /** Aquí ya devolvemos objetos con id + nombre */
  sintomas: SintomaDTO[] | null;
  notas: string | null;
  creado_en: string;
};

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

  static fromRow(r: any): SensacionComida {
    return new SensacionComida(
      r.id,
      r.comida_id,
      r.estado_animo_id !== null ? Number(r.estado_animo_id) : null,
      r.saciedad !== null ? Number(r.saciedad) : null,
      r.energia !== null ? Number(r.energia) : null,
      Array.isArray(r.sintomas) ? r.sintomas.map((n: any) => Number(n)) : null,
      r.notas ?? null,
      r.creado_en,
    );
  }

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
