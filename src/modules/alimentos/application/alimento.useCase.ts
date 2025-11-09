import type { AlimentoRepository, CreateAlimentoDTO } from "../domain/alimento.repository.port";
import type { AlimentoDTO } from "../domain/alimento.entity";

export class ListAlimentos {
  constructor(private readonly repo: AlimentoRepository) {}
  async execute(): Promise<AlimentoDTO[]> {
    const entities = await this.repo.list();
    return entities.map(a => a.toDTO());
  }
}

export class ListAlimentosById {
  constructor(private readonly repo: AlimentoRepository) {}
  async execute(id: string): Promise<AlimentoDTO | null> {
    const entity = await this.repo.getById(id);
    return entity ? entity.toDTO() : null;
  }
}

export class CreateAlimento {
  constructor(private readonly repo: AlimentoRepository) {}
  async execute(input: CreateAlimentoDTO): Promise<AlimentoDTO> {
    const entity = await this.repo.create({
      nombre: input.nombre?.trim(),
      calorias: input.calorias ?? null,
    });
    return entity.toDTO();
  }
}

export class DeleteAlimento {
  constructor(private readonly repo: AlimentoRepository) {}
  async execute(id: string): Promise<boolean> {
    return await this.repo.delete(id);
  }
}

export class UpdateAlimento {
  constructor(private readonly repo: AlimentoRepository) {}
  async execute(id: string, input: CreateAlimentoDTO): Promise<AlimentoDTO> {
    const entity = await this.repo.update(id, {
      nombre: input.nombre?.trim(),
      calorias: input.calorias ?? null,
    });
    return entity.toDTO();
  }
}
