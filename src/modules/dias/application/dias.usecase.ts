import type {
  DiaRepository,
  CreateDiaDTO,
  CloseDiaDTO,
  AddComidaDTO,
  AddConsumoDTO,
} from "../domain/dia.repository.port";
import type { DiaDTO } from "../domain/dia.entity";
import type { ComidaDTO } from "../domain/comida.entity";
import type { ConsumoDTO } from "../domain/consumo.entity";
import type { PlatoRepository } from "../../platos/domain/plato.repository.port";
import { ComidaPlatoDTO } from "../domain/comidaPlato.entity";

export class CreateDia {
  constructor(private readonly repo: DiaRepository) {}
  async execute(input: CreateDiaDTO): Promise<DiaDTO> {
    const d = await this.repo.createDia(input);
    return d.toDTO();
  }
}

export class ListDiasByUsuario {
  constructor(private readonly repo: DiaRepository) {}
  async execute(usuario_id: string, filtros?: { desde?: string; hasta?: string }): Promise<DiaDTO[]> {
    const dias = await this.repo.listDiasByUsuario(usuario_id, filtros?.desde, filtros?.hasta);
    return dias.map((d) => d.toDTO());
  }
}

export class CloseDia {
  constructor(private readonly repo: DiaRepository) {}
  async execute(input: CloseDiaDTO): Promise<DiaDTO | null> {
    const d = await this.repo.closeDia(input);
    return d ? d.toDTO() : null;
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
    const cs = await this.repo.listComidasByDia(dia_id);
    return cs.map((c) => c.toDTO());
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

// ========== NUEVO: AÑADIR PLATO A COMIDA ==========

export class AddPlatoAComida {
  constructor(
    private readonly diaRepo: DiaRepository,
    private readonly platoRepo: PlatoRepository
  ) {}

  async execute(input: {
    comida_id: string;
    plato_id: string;
    multiplicador?: number;
  }): Promise<ConsumoDTO[]> {
    const mult = input.multiplicador && input.multiplicador > 0 ? input.multiplicador : 1;

    // 1) Crear grupo plato↔comida
    const grp = await this.diaRepo.addComidaPlato({
      comida_id: input.comida_id,
      plato_id: input.plato_id,
      multiplicador: mult,
    });

    // 2) Traer ingredientes del plato
    const ingredientes = await this.platoRepo.listIngredientes(input.plato_id);
    // { id, plato_id, alimento_id, cantidad, unidad }

    // 3) Insertar consumos con referencia al grupo
    const creados: ConsumoDTO[] = [];
    for (const ing of ingredientes) {
      const dto: AddConsumoDTO = {
        comida_id: input.comida_id,
        alimento_id: ing.alimento_id,
        cantidad: Number((ing.cantidad ?? 0) * mult),
        unidad: ing.unidad,
        comida_plato_id: grp.id, // <--- referencia de agrupación
      };
      const c = await this.diaRepo.addConsumo(dto);
      creados.push(c.toDTO ? c.toDTO() : (c as any));
    }

    return creados;
  }
}

export class ListComidaPlatosDeComida {
  constructor(private readonly repo: DiaRepository) {}

  async execute(comida_id: string): Promise<ComidaPlatoDTO[]> {
    const cps = await this.repo.listComidaPlatosByComida(comida_id);
    return cps.map((cp) => cp.toDTO());
  }
}
