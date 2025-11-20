import type {
  SensacionesRepository,
  SensacionComidaCreateInput,
  SensacionComidaUpdateInput,
  SensacionPlatoCreateInput,
  SensacionPlatoUpdateInput,
  SensacionAlimentoCreateInput,
  SensacionAlimentoUpdateInput,
} from "../domain/sensaciones.repository.port";
import type { SensacionComidaDTO } from "../domain/sensacionComida.entity";
import type { SensacionPlatoDTO } from "../domain/sensacionPlato.entity";
import type { SensacionAlimentoDTO } from "../domain/sensacionAlimento.entity";
import { SintomaDTO } from "../domain/sintoma.entity";

// ──────────────────────────────────────────────────────────
// COMIDA
// ──────────────────────────────────────────────────────────

export class GetSensacionComida {
  constructor(private readonly repo: SensacionesRepository) {}

  async execute(comida_id: string): Promise<SensacionComidaDTO | null> {
    const entity = await this.repo.findSensacionComidaByComidaId(comida_id);
    if (!entity) return null;

    const ids = entity.sintomas ?? [];
    const sintomasEntities = ids.length ? await this.repo.findSintomasByIds(ids) : [];
    const sintomasDTO = sintomasEntities.map((s) => s.toDTO());

    return entity.toDTO(sintomasDTO);
  }
}

export class CreateSensacionComida {
  constructor(private readonly repo: SensacionesRepository) {}

  async execute(input: SensacionComidaCreateInput): Promise<SensacionComidaDTO> {
    const entity = await this.repo.createSensacionComida(input);

    const ids = entity.sintomas ?? [];
    const sintomasEntities = ids.length ? await this.repo.findSintomasByIds(ids) : [];
    const sintomasDTO = sintomasEntities.map((s) => s.toDTO());

    return entity.toDTO(sintomasDTO);
  }
}

export class UpdateSensacionComida {
  constructor(private readonly repo: SensacionesRepository) {}

  async execute(comida_id: string, input: SensacionComidaUpdateInput): Promise<SensacionComidaDTO> {
    const entity = await this.repo.updateSensacionComidaByComidaId(comida_id, input);
    if (!entity) {
      throw new Error("Sensación de comida no encontrada para actualizar");
    }

    const ids = entity.sintomas ?? [];
    const sintomasEntities = ids.length ? await this.repo.findSintomasByIds(ids) : [];
    const sintomasDTO = sintomasEntities.map((s) => s.toDTO());

    return entity.toDTO(sintomasDTO);
  }
}

// ──────────────────────────────────────────────────────────
// PLATO
// ──────────────────────────────────────────────────────────

export class GetSensacionPlato {
  constructor(private readonly repo: SensacionesRepository) {}

  async execute(comida_plato_id: string): Promise<SensacionPlatoDTO | null> {
    const entity = await this.repo.findSensacionPlatoByComidaPlatoId(comida_plato_id);
    return entity ? entity.toDTO() : null;
  }
}

export class CreateSensacionPlato {
  constructor(private readonly repo: SensacionesRepository) {}

  async execute(input: SensacionPlatoCreateInput): Promise<SensacionPlatoDTO> {
    const entity = await this.repo.createSensacionPlato(input);
    return entity.toDTO();
  }
}

export class UpdateSensacionPlato {
  constructor(private readonly repo: SensacionesRepository) {}

  async execute(comida_plato_id: string, input: SensacionPlatoUpdateInput): Promise<SensacionPlatoDTO> {
    const entity = await this.repo.updateSensacionPlatoByComidaPlatoId(comida_plato_id, input);
    if (!entity) {
      throw new Error("Sensación de plato no encontrada para actualizar");
    }
    return entity.toDTO();
  }
}

// ──────────────────────────────────────────────────────────
// ALIMENTO (consumo)
// ──────────────────────────────────────────────────────────

export class GetSensacionAlimento {
  constructor(private readonly repo: SensacionesRepository) {}

  async execute(alimento_consumido_id: string): Promise<SensacionAlimentoDTO | null> {
    const entity = await this.repo.findSensacionAlimentoByConsumoId(alimento_consumido_id);
    return entity ? entity.toDTO() : null;
  }
}

export class CreateSensacionAlimento {
  constructor(private readonly repo: SensacionesRepository) {}

  async execute(input: SensacionAlimentoCreateInput): Promise<SensacionAlimentoDTO> {
    const entity = await this.repo.createSensacionAlimento(input);
    return entity.toDTO();
  }
}

export class UpdateSensacionAlimento {
  constructor(private readonly repo: SensacionesRepository) {}

  async execute(alimento_consumido_id: string, input: SensacionAlimentoUpdateInput): Promise<SensacionAlimentoDTO> {
    const entity = await this.repo.updateSensacionAlimentoByConsumoId(alimento_consumido_id, input);
    if (!entity) {
      throw new Error("Sensación de alimento no encontrada para actualizar");
    }
    return entity.toDTO();
  }
}

// Sintomas
export class ListSintomas {
  constructor(private readonly repo: SensacionesRepository) {}

  async execute(): Promise<SintomaDTO[]> {
    const entities = await this.repo.listSintomas();
    return entities.map((s) => s.toDTO());
  }
}