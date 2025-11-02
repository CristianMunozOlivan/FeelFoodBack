import type { PlatoRepository, CreatePlatoDTO, AddIngredienteDTO } from "../domain/plato.repository.port";
import type { PlatoDTO } from "../domain/plato.entity";
import type { PlatoIngredienteDTO } from "../domain/ingrediente.entity";

export class ListPlatos {
  constructor(private readonly repo: PlatoRepository) {}
  async execute(usuario_id: string): Promise<PlatoDTO[]> {
    const list = await this.repo.listByUsuario(usuario_id);
    return list.map(p => p.toDTO());
  }
}

export class CreatePlato {
  constructor(private readonly repo: PlatoRepository) {}
  async execute(input: CreatePlatoDTO): Promise<PlatoDTO> {
    const created = await this.repo.create({
      usuario_id: input.usuario_id,
      nombre: input.nombre?.trim(),
    });
    return created.toDTO();
  }
}

export class AddIngredientePlato {
  constructor(private readonly repo: PlatoRepository) {}
  async execute(input: AddIngredienteDTO): Promise<PlatoIngredienteDTO> {
    const ing = await this.repo.addIngrediente(input);
    return ing.toDTO();
  }
}

export class ListIngredientesPlato {
  constructor(private readonly repo: PlatoRepository) {}
  async execute(plato_id: string): Promise<PlatoIngredienteDTO[]> {
    const list = await this.repo.listIngredientes(plato_id);
    return list.map(i => i.toDTO());
  }
}

export class RemoveIngredientePlato {
  constructor(private readonly repo: PlatoRepository) {}
  async execute(ingrediente_id: string): Promise<void> {
    await this.repo.removeIngrediente(ingrediente_id);
  }
}
