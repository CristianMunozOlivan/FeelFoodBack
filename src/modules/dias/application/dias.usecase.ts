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

// Caso de uso: crear día
export class CreateDia {
  constructor(private readonly repo: DiaRepository) {}
  async execute(input: CreateDiaDTO): Promise<DiaDTO> {
    const dia = await this.repo.createDia(input);
    return dia.toDTO();
  }
}
// Caso de uso: listar días por usuario con filtros opcionales
export class ListDiasByUsuario {
  constructor(private readonly repo: DiaRepository) {}
  async execute(usuario_id: string, filtros?: { desde?: string; hasta?: string }): Promise<DiaDTO[]> {
    const dias = await this.repo.listDiasByUsuario(usuario_id, filtros?.desde, filtros?.hasta);
    return dias.map((dia) => dia.toDTO());
  }
}
// Caso de uso: cerrar día
export class CloseDia {
  constructor(private readonly repo: DiaRepository) {}
  async execute(input: CloseDiaDTO): Promise<DiaDTO | null> {
    const dia = await this.repo.closeDia(input);
    return dia ? dia.toDTO() : null;
  }
}
// Caso de uso: añadir comida a día
export class AddComida {
  constructor(private readonly repo: DiaRepository) {}
  async execute(input: AddComidaDTO): Promise<ComidaDTO> {
    const comida = await this.repo.addComida(input);
    return comida.toDTO();
  }
}
// Caso de uso: listar comidas de un día
export class ListComidasDeDia {
  constructor(private readonly repo: DiaRepository) {}
  async execute(dia_id: string): Promise<ComidaDTO[]> {
    const listaComidas = await this.repo.listComidasByDia(dia_id);
    return listaComidas.map((comida) => comida.toDTO());
  }
}
// Caso de uso: añadir alimento a comida
export class AddAlimentoAComida {
  constructor(private readonly repo: DiaRepository) {}
  async execute(input: AddConsumoDTO): Promise<ConsumoDTO> {
    const consumo = await this.repo.addConsumo(input);
    return consumo.toDTO();
  }
}
// Caso de uso: listar consumos de una comida
export class RemoveAlimentoDeComida {
  constructor(private readonly repo: DiaRepository) {}
  async execute(consumo_id: string): Promise<void> {
    await this.repo.removeConsumo(consumo_id);
  }
}

// Caso de uso: añadir plato a comida
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
    const grupoPlato = await this.diaRepo.addComidaPlato({
      comida_id: input.comida_id,
      plato_id: input.plato_id,
      multiplicador: mult,
    });

    // 2) Traer ingredientes del plato
    const ingredientes = await this.platoRepo.listIngredientes(input.plato_id);

    // 3) Insertar consumos con referencia al grupo
    const creados: ConsumoDTO[] = [];
    for (const ing of ingredientes) {
      const dto: AddConsumoDTO = {
        comida_id: input.comida_id,
        alimento_id: ing.alimento_id,
        cantidad: Number((ing.cantidad ?? 0) * mult),
        unidad: ing.unidad,
        comida_plato_id: grupoPlato.id,
      };
      const consumo = await this.diaRepo.addConsumo(dto);
      creados.push(consumo.toDTO ? consumo.toDTO() : (consumo as any));
    }
    return creados;
  }
}

// Caso de uso: listar platos asociados a una comida
export class ListComidaPlatosDeComida {
  constructor(private readonly repo: DiaRepository) {}

  async execute(comida_id: string): Promise<ComidaPlatoDTO[]> {
    const comidaPlatos = await this.repo.listComidaPlatosByComida(comida_id);
    return comidaPlatos.map((comidaPlato) => comidaPlato.toDTO());
  }
}
