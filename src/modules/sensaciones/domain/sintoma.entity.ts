export type SintomaDTO = {
  id: number;
  nombre: string;
  descripcion: string | null;
};

export default class Sintoma {
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string | null,
  ) {
    if (!nombre) throw new Error("nombre de síntoma requerido");
  }

  static fromRow(row: any): Sintoma {
    return new Sintoma(
      Number(row.id),
      row.nombre,
      row.descripcion ?? null,
    );
  }

  toDTO(): SintomaDTO {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
    };
  }
}
