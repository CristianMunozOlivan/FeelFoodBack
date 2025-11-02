import type { CatalogRepository } from "../domain/catalog.repository.port";
import type { EstadoAnimoDTO } from "../domain/estadoAnimo.entity";
import type { TipoComidaDTO } from "../domain/tipoComida.entity";

export class ListEstadosAnimo {
  constructor(private readonly repo: CatalogRepository) {}
  async execute(): Promise<EstadoAnimoDTO[]> {
    const list = await this.repo.listEstadosAnimo();
    return list.map(e => e.toDTO());
  }
}

export class ListTiposComida {
  constructor(private readonly repo: CatalogRepository) {}
  async execute(): Promise<TipoComidaDTO[]> {
    const list = await this.repo.listTiposComida();
    return list.map(t => t.toDTO());
  }
}
