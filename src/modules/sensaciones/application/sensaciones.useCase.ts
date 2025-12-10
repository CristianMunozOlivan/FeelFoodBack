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

// Caso de uso: obtener sensación de comida
export class GetSensacionComida {
  constructor(private readonly repo: SensacionesRepository) {}

  async execute(comida_id: string): Promise<SensacionComidaDTO | null> {
    const sensacionComida = await this.repo.findSensacionComidaByComidaId(comida_id);
    if (!sensacionComida) return null;

    const ids = sensacionComida.sintomas ?? [];
    const sintomasEntities = ids.length ? await this.repo.findSintomasByIds(ids) : [];
    const sintomasDTO = sintomasEntities.map((s) => s.toDTO());

    return sensacionComida.toDTO(sintomasDTO);
  }
}
// Caso de uso: crear sensación de comida
export class CreateSensacionComida {
  constructor(private readonly repo: SensacionesRepository) {}

  async execute(input: SensacionComidaCreateInput): Promise<SensacionComidaDTO> {
    const sensacionComida = await this.repo.createSensacionComida(input);

    const ids = sensacionComida.sintomas ?? [];
    const sintomasEntities = ids.length ? await this.repo.findSintomasByIds(ids) : [];
    const sintomasDTO = sintomasEntities.map((s) => s.toDTO());

    return sensacionComida.toDTO(sintomasDTO);
  }
}
// Caso de uso: actualizar sensación de comida
export class UpdateSensacionComida {
  constructor(private readonly repo: SensacionesRepository) {}

  async execute(comida_id: string, input: SensacionComidaUpdateInput): Promise<SensacionComidaDTO> {
    const sensacionComida = await this.repo.updateSensacionComidaByComidaId(comida_id, input);
    if (!sensacionComida) {
      throw new Error("Sensación de comida no encontrada para actualizar");
    }

    const ids = sensacionComida.sintomas ?? [];
    const sintomasEntities = ids.length ? await this.repo.findSintomasByIds(ids) : [];
    const sintomasDTO = sintomasEntities.map((s) => s.toDTO());

    return sensacionComida.toDTO(sintomasDTO);
  }
}
// Caso de uso: obtener sensación de plato
export class GetSensacionPlato {
  constructor(private readonly repo: SensacionesRepository) {}

  async execute(comida_plato_id: string): Promise<SensacionPlatoDTO | null> {
    const sensacionPlato = await this.repo.findSensacionPlatoByComidaPlatoId(comida_plato_id);
    return sensacionPlato ? sensacionPlato.toDTO() : null;
  }
}
// Caso de uso: crear sensación de plato
export class CreateSensacionPlato {
  constructor(private readonly repo: SensacionesRepository) {}

  async execute(input: SensacionPlatoCreateInput): Promise<SensacionPlatoDTO> {
    const sensacionPlato = await this.repo.createSensacionPlato(input);
    return sensacionPlato.toDTO();
  }
}
// Caso de uso: actualizar sensación de plato
export class UpdateSensacionPlato {
  constructor(private readonly repo: SensacionesRepository) {}

  async execute(comida_plato_id: string, input: SensacionPlatoUpdateInput): Promise<SensacionPlatoDTO> {
    const sensacionPlato = await this.repo.updateSensacionPlatoByComidaPlatoId(comida_plato_id, input);
    if (!sensacionPlato) {
      throw new Error("Sensación de plato no encontrada para actualizar");
    }
    return sensacionPlato.toDTO();
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