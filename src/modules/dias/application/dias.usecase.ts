import type {
  DiaRepository, CreateDiaDTO, CloseDiaDTO,
  AddComidaDTO, AddConsumoDTO
} from "../domain/dia.repository.port";
import type { DiaDTO } from "../domain/dia.entity";
import type { ComidaDTO } from "../domain/comida.entity";
import type { ConsumoDTO } from "../domain/consumo.entity";

export class CreateDia {
  constructor(private readonly repo: DiaRepository) {}
  async execute(input: CreateDiaDTO): Promise<DiaDTO> {
    const d = await this.repo.createDia(input);
    return d.toDTO();
  }
}

export class ListDiasByUsuario {
  constructor(private readonly repo: DiaRepository) {}
  async execute(usuario_id: string, desde?: string, hasta?: string): Promise<DiaDTO[]> {
    const list = await this.repo.listDiasByUsuario(usuario_id, desde, hasta);
    return list.map(d => d.toDTO());
  }
}

export class CloseDia {
  constructor(private readonly repo: DiaRepository) {}
  async execute(input: CloseDiaDTO): Promise<DiaDTO> {
    const d = await this.repo.closeDia(input);
    if (!d) throw new Error("Día no encontrado");
    return d.toDTO();
  }
}

export class AddComida {
  constructor(private readonly repo: DiaRepository) {}
  async execute(input: AddComidaDTO): Promise<ComidaDTO> {
    const c = await this.repo.addComida(input);
    return c.toDTO();
  }
}

export class ListComidasDeDia {
  constructor(private readonly repo: DiaRepository) {}
  async execute(dia_id: string): Promise<ComidaDTO[]> {
    const list = await this.repo.listComidasByDia(dia_id);
    return list.map(c => c.toDTO());
  }
}

export class AddAlimentoAComida {
  constructor(private readonly repo: DiaRepository) {}
  async execute(input: AddConsumoDTO): Promise<ConsumoDTO> {
    const c = await this.repo.addConsumo(input);
    return c.toDTO();
  }
}

export class RemoveAlimentoDeComida {
  constructor(private readonly repo: DiaRepository) {}
  async execute(consumo_id: string): Promise<void> {
    await this.repo.removeConsumo(consumo_id);
  }
}
