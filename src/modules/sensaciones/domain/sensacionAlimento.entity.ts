// src/modules/Sensaciones/domain/sensacionAlimento.entity.ts

export type SensacionAlimentoDTO = {
  id?: string;
  alimento_consumido_id: string;
  tolerancia: number | null;
  sintomas: number[] | null;
  notas: string | null;
  creado_en?: string | null;
};

export default class SensacionAlimento {
  public id?: string;

  constructor(
    public alimento_consumido_id: string,
    public tolerancia: number | null,
    public sintomas: number[] | null,
    public notas: string | null,
    public creado_en?: string | null,
  ) {
    if (!alimento_consumido_id) throw new Error("alimento_consumido_id requerido");
    this.alimento_consumido_id = alimento_consumido_id;
    this.tolerancia = tolerancia ?? null;
    this.sintomas = sintomas ?? null;
    this.notas = notas ?? null;
    this.creado_en = creado_en ?? null;
  }

  static fromRow(row: any): SensacionAlimento {
    const s = new SensacionAlimento(
      row.alimento_consumido_id,
      row.tolerancia ?? null,
      Array.isArray(row.sintomas)
      ? row.sintomas.map((n: any) => Number(n))
      : null,
      row.notas ?? null,
      row.creado_en ?? null,
    );
    s.id = row.id;
    return s;
  }

  toDTO(): SensacionAlimentoDTO {
    return {
      id: this.id,
      alimento_consumido_id: this.alimento_consumido_id,
      tolerancia: this.tolerancia,
      sintomas: this.sintomas,
      notas: this.notas,
      creado_en: this.creado_en,
    };
  }
}
