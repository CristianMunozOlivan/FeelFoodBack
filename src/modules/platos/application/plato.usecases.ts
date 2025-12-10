import type { PlatoRepository, CreatePlatoDTO, AddIngredienteDTO, UpdatePlatoDTO } from "../domain/plato.repository.port";
import type { PlatoDTO } from "../domain/plato.entity";
import type { PlatoIngredienteDTO } from "../domain/ingrediente.entity";

// Caso de uso: listar platos por usuario
export class ListPlatos {
  constructor(private readonly repo: PlatoRepository) {}
  async execute(usuario_id: string): Promise<PlatoDTO[]> {
    const listarPlatos = await this.repo.listByUsuario(usuario_id);
    return listarPlatos.map(plato => plato.toDTO());
  }
}
// Caso de uso: crear plato
export class CreatePlato {
  constructor(private readonly repo: PlatoRepository) {}
  async execute(input: CreatePlatoDTO): Promise<PlatoDTO> {
    const plato = await this.repo.create({
      usuario_id: input.usuario_id,
      nombre: input.nombre?.trim(),
    });
    return plato.toDTO();
  }
}
// Caso de uso: actualizar plato
export class UpdatePlato {
  constructor(private readonly repo: PlatoRepository) {}
  async execute(input: UpdatePlatoDTO): Promise<PlatoDTO> {
    const plato = await this.repo.update(input);
    return plato.toDTO();
  }
}
// Caso de uso: eliminar plato
export class DeletePlato {
  constructor(private readonly repo: PlatoRepository) {}
  async execute(plato_id: string, usuario_id: string): Promise<void> {
    await this.repo.delete(plato_id, usuario_id);
  }
}
// Caso de uso: añadir ingrediente a plato
export class AddIngredientePlato {
  constructor(private repo: PlatoRepository) {}
  execute(input: { plato_id: string; alimento_id: string; cantidad: number; unidad: string }) {
    return this.repo.addIngrediente(input);
  }
}

// Caso de uso: listar ingredientes de un plato
export class ListIngredientesPlato {
  constructor(private readonly repo: PlatoRepository) {}
  async execute(plato_id: string): Promise<PlatoIngredienteDTO[]> {
    const listarIngredientesPLato = await this.repo.listIngredientes(plato_id);
    return listarIngredientesPLato.map(ingredientePlato => ingredientePlato.toDTO());
  }
}
// Caso de uso: eliminar ingrediente de un plato
export class RemoveIngredientePlato {
  constructor(private readonly repo: PlatoRepository) {}
  async execute(ingrediente_id: string): Promise<void> {
    await this.repo.removeIngrediente(ingrediente_id);
  }
}
// Caso de uso: actualizar ingrediente de un plato
export class UpdateIngredientePlato {
  constructor(private readonly repo: PlatoRepository) {} 
  async execute(ingrediente_id: string, input: { cantidad: number; unidad: string }): Promise<PlatoIngredienteDTO> {
    const ingredientePlato = await this.repo.updateIngrediente(ingrediente_id, input);
    return ingredientePlato.toDTO();
  }
}