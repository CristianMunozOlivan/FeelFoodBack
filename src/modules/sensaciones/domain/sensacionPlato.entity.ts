// DTO para SensacionPlato
export type SensacionPlatoDTO = {
  id?: string;
  comida_plato_id: string;
  tolerancia: number | null;
  sintomas: number[] | null;
  notas: string | null;
  creado_en?: string | null;
};
// Definición de la entidad SensacionPlato y su DTO
export default class SensacionPlato {
  public id?: string;

  constructor(
    public comida_plato_id: string,
    public tolerancia: number | null,
    public sintomas: number[] | null,
    public notas: string | null,
    public creado_en?: string | null,
  ) {
    if (!comida_plato_id) throw new Error("comida_plato_id requerido");
    this.comida_plato_id = comida_plato_id;
    this.tolerancia = tolerancia ?? null;
    this.sintomas = sintomas ?? null;
    this.notas = notas ?? null;
    this.creado_en = creado_en ?? null;
  }
// Convierte una fila de BD en una entidad SensacionPlato
  static fromRow(row: any): SensacionPlato {
    const sensacionPlato = new SensacionPlato(
      row.comida_plato_id,
      row.tolerancia ?? null,
      Array.isArray(row.sintomas)
      ? row.sintomas.map((n: any) => Number(n))
      : null,
      row.notas ?? null,
      row.creado_en ?? null,
    );
    sensacionPlato.id = row.id;
    return sensacionPlato;
  }
// Convierte la entidad SensacionPlato en un DTO
  toDTO(): SensacionPlatoDTO {
    return {
      id: this.id,
      comida_plato_id: this.comida_plato_id,
      tolerancia: this.tolerancia,
      sintomas: this.sintomas,
      notas: this.notas,
      creado_en: this.creado_en,
    };
  }
}
