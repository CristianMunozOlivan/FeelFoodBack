// Entidad Dia: registro diario de estado de ánimo y notas del usuario
export type DiaDTO = {
  id?: string;
  usuario_id: string;
  fecha: string;
  estado_animo_inicio_id: number;
  estado_animo_final_id?: number | null;
  notas?: string | null;
};
// Definición de la entidad Dia y su DTO
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
  // Convierte una fila de BD en una entidad Dia
  static fromRow(row: any): Dia {
    const dia = new Dia(
      row.usuario_id,
      row.fecha,
      row.estado_animo_inicio_id,
      row.estado_animo_final_id ?? null,
      row.notas ?? null
    );
    dia.id = row.id;
    return dia;
  }
  // Convierte la entidad Dia en un DTO
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
