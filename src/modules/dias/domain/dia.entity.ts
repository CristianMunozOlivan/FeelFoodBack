export type DiaDTO = {
  id?: string;
  usuario_id: string;
  fecha: string; // YYYY-MM-DD
  estado_animo_inicio_id: number;
  estado_animo_final_id?: number | null;
  notas?: string | null;
};

export default class Dia {
  public id?: string;
  constructor(
    public usuario_id: string,
    public fecha: string,
    public estado_animo_inicio_id: number,
    public estado_animo_final_id: number | null = null,
    public notas: string | null = null
  ) {
    this.usuario_id = usuario_id;
    this.fecha = fecha;
    this.estado_animo_inicio_id = estado_animo_inicio_id;
    this.estado_animo_final_id = estado_animo_final_id ?? null;
    this.notas = notas ?? null;
  }
  static fromRow(row: any): Dia {
    const d = new Dia(
      row.usuario_id,
      row.fecha, // viene como date -> pg lo serializa a string YYYY-MM-DD
      row.estado_animo_inicio_id,
      row.estado_animo_final_id ?? null,
      row.notas ?? null
    );
    d.id = row.id;
    return d;
  }
  toDTO(): DiaDTO {
    return {
      id: this.id,
      usuario_id: this.usuario_id,
      fecha: this.fecha,
      estado_animo_inicio_id: this.estado_animo_inicio_id,
      estado_animo_final_id: this.estado_animo_final_id ?? null,
      notas: this.notas ?? null,
    };
  }
}
