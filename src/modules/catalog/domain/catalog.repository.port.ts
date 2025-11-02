import EstadoAnimo from "./estadoAnimo.entity";
import TipoComida from "./tipoComida.entity";

export interface CatalogRepository {
  listEstadosAnimo(): Promise<EstadoAnimo[]>;
  listTiposComida(): Promise<TipoComida[]>;
}
