import type { AlimentoRepository, CreateAlimentoDTO } from "../domain/alimento.repository.port";
import type { AlimentoDTO } from "../domain/alimento.entity";

// Caso de uso: listar alimentos
export class ListAlimentos {
  constructor(private readonly repo: AlimentoRepository) {}
  async execute(): Promise<AlimentoDTO[]> {
    const listAlimentos = await this.repo.list();
    return listAlimentos.map(a => a.toDTO());
  }
}

// Caso de uso: listar alimento por id
export class ListAlimentosById {
  constructor(private readonly repo: AlimentoRepository) {}
  async execute(id: string): Promise<AlimentoDTO | null> {
    const listAlimento = await this.repo.getById(id);
    return listAlimento ? listAlimento.toDTO() : null;
  }
}

// Caso de uso: crear alimento
export class CreateAlimento {
  constructor(private readonly repo: AlimentoRepository) {}
  async execute(input: CreateAlimentoDTO): Promise<AlimentoDTO> {
    const alimento = await this.repo.create({
      nombre: input.nombre?.trim(),
      calorias: input.calorias ?? null,
    });
    return alimento.toDTO();
  }
}

// Caso de uso: eliminar alimento
export class DeleteAlimento {
  constructor(private readonly repo: AlimentoRepository) {}
  async execute(id: string): Promise<boolean> {
    return await this.repo.delete(id);
  }
}

// Caso de uso: actualizar alimento
export class UpdateAlimento {
  constructor(private readonly repo: AlimentoRepository) {}
  async execute(id: string, input: CreateAlimentoDTO): Promise<AlimentoDTO> {
    const alimento = await this.repo.update(id, {
      nombre: input.nombre?.trim(),
      calorias: input.calorias ?? null,
    });
    return alimento.toDTO();
  }
}
