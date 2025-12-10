import EstadoAnimo from "./estadoAnimo.entity";
import TipoComida from "./tipoComida.entity";

// Puerto del repositorio de Catalog
// Funciones para listar estados de ánimo y tipos de comida
export interface CatalogRepository {
  listEstadosAnimo(): Promise<EstadoAnimo[]>;
  listTiposComida(): Promise<TipoComida[]>;
}
