
import { env } from './env';
import { Pool } from 'pg';

import { PgUserRepository } from '../modules/auth/infra/db/pgUser.repository';
import { BcryptHasher } from '../modules/auth/infra/crypto/bcrypt.hasher';
import { JwtTokenService } from '../modules/auth/infra/crypto/jwt.token.service';
import { RegisterUser } from '../modules/auth/application/registerUser.usecase';
import { LoginUser } from '../modules/auth/application/loginUser.usecase';
import { AuthController } from '../modules/auth/infra/http/auth.controller';

// Platos
import { PgPlatoRepository } from '../modules/platos/infra/db/pgPlato.repository';
import { PlatosController } from '../modules/platos/infra/http/platos.controller';
import { ListPlatos, CreatePlato, AddIngredientePlato, ListIngredientesPlato, RemoveIngredientePlato, DeletePlato, UpdatePlato, UpdateIngredientePlato } from '../modules/platos/application/plato.usecases';

// Catálogo
import { PgCatalogRepository } from '../modules/catalog/infra/db/pgCatalog.repository';
import { CatalogController } from '../modules/catalog/infra/http/catalog.controller';
import { ListEstadosAnimo, ListTiposComida } from '../modules/catalog/application/catalog.usecases';

// Días
import { PgDiaRepository } from '../modules/dias/infra/db/pgDia.repository';
import {
  CreateDia, ListDiasByUsuario, CloseDia,
  AddComida, ListComidasDeDia, AddAlimentoAComida, RemoveAlimentoDeComida,
  AddPlatoAComida,
  ListComidaPlatosDeComida
} from '../modules/dias/application/dias.usecase';
import { DiasController } from '../modules/dias/infra/http/dias.controller';

// Alimentos
import { PgAlimentoRepository } from '../modules/alimentos/infra/db/pgAlimento.repository';
import { AlimentosController } from '../modules/alimentos/infra/http/alimentos.controller';
import { DeleteAlimento, ListAlimentos, UpdateAlimento } from '../modules/alimentos/application/alimento.useCase';
import { CreateAlimento } from '../modules/alimentos/application/alimento.useCase';

// Sensaciones
import { PgSensacionesRepository } from '../modules/sensaciones/infra/db/pgSensaciones.repository';
import { SensacionesController } from '../modules/sensaciones/infra/http/sensaciones.controller';
import {
  GetSensacionComida,
  CreateSensacionComida,
  UpdateSensacionComida,
  GetSensacionPlato,
  CreateSensacionPlato,
  UpdateSensacionPlato,
  GetSensacionAlimento,
  CreateSensacionAlimento,
  UpdateSensacionAlimento,
  ListSintomas,
} from '../modules/sensaciones/application/sensaciones.useCase';

export function buildContainer() {
  // Pool de conexiones compartido 
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  // Auth
  const userRepo = new PgUserRepository(pool);
  const hasher = new BcryptHasher(10);
  const tokenService = new JwtTokenService(env.JWT_SECRET, env.JWT_EXPIRES_IN);
  const registerUser = new RegisterUser(userRepo, hasher);
  const loginUser = new LoginUser(userRepo, hasher, tokenService);
  const authController = new AuthController(registerUser, loginUser);



  // Platos
  const platoRepo = new PgPlatoRepository(pool);
  const listPlatosUC = new ListPlatos(platoRepo);
  const createPlatoUC = new CreatePlato(platoRepo);
  const updatePlatoUC = new UpdatePlato(platoRepo);
  const deletePlatoUC = new DeletePlato(platoRepo);
  const addIngUC = new AddIngredientePlato(platoRepo);
  const listIngUC = new ListIngredientesPlato(platoRepo);
  const removeIngUC = new RemoveIngredientePlato(platoRepo);
  const updateIngUC = new UpdateIngredientePlato(platoRepo);

  const platosController = new PlatosController(listPlatosUC, createPlatoUC, updatePlatoUC, deletePlatoUC, addIngUC, listIngUC, removeIngUC, updateIngUC);

  // Alimentos 
  const alimentoRepo = new PgAlimentoRepository(pool);
  const listAlimentosUC = new ListAlimentos(alimentoRepo);
  const createAlimentoUC = new CreateAlimento(alimentoRepo);
  const deleteAlimentoUC = new DeleteAlimento(alimentoRepo);
  const updateAlimentoUC = new UpdateAlimento(alimentoRepo);
  const alimentosController = new AlimentosController(listAlimentosUC, createAlimentoUC, deleteAlimentoUC, updateAlimentoUC);

  // Catálogo 
  const catalogRepo = new PgCatalogRepository(pool);
  const listEstadosUC = new ListEstadosAnimo(catalogRepo);
  const listTiposUC = new ListTiposComida(catalogRepo);
  const catalogController = new CatalogController(listEstadosUC, listTiposUC);

  // Días 
  const diaRepo = new PgDiaRepository(pool);
  const createDiaUC = new CreateDia(diaRepo);
  const listDiasUC = new ListDiasByUsuario(diaRepo);
  const closeDiaUC = new CloseDia(diaRepo);
  const addComidaUC = new AddComida(diaRepo);
  const listComidasUC = new ListComidasDeDia(diaRepo);
  const addConsumoUC = new AddAlimentoAComida(diaRepo);
  const removeConsumoUC = new RemoveAlimentoDeComida(diaRepo);
  const addPlatoUC = new AddPlatoAComida(diaRepo, platoRepo);
  const listComidaPlatosUC = new ListComidaPlatosDeComida(diaRepo);
  const diasController = new DiasController(
    createDiaUC, listDiasUC, closeDiaUC, addComidaUC, listComidasUC, addConsumoUC, removeConsumoUC, addPlatoUC, listComidaPlatosUC
  );

  // Sensaciones
  const sensacionesRepo = new PgSensacionesRepository(pool);
  const getSensacionComidaUC = new GetSensacionComida(sensacionesRepo);
  const createSensacionComidaUC = new CreateSensacionComida(sensacionesRepo);
  const updateSensacionComidaUC = new UpdateSensacionComida(sensacionesRepo);
  const getSensacionPlatoUC = new GetSensacionPlato(sensacionesRepo);
  const createSensacionPlatoUC = new CreateSensacionPlato(sensacionesRepo);
  const updateSensacionPlatoUC = new UpdateSensacionPlato(sensacionesRepo);
  const getSensacionAlimentoUC = new GetSensacionAlimento(sensacionesRepo);
  const createSensacionAlimentoUC = new CreateSensacionAlimento(sensacionesRepo);
  const updateSensacionAlimentoUC = new UpdateSensacionAlimento(sensacionesRepo);
  const listSintomasUC = new ListSintomas(sensacionesRepo);

  const sensacionesController = new SensacionesController(
    getSensacionComidaUC,
    createSensacionComidaUC,
    updateSensacionComidaUC,
    getSensacionPlatoUC,
    createSensacionPlatoUC,
    updateSensacionPlatoUC,
    getSensacionAlimentoUC,
    createSensacionAlimentoUC,
    updateSensacionAlimentoUC,
    listSintomasUC,
  );

  return {
    authController,
    platosController,
    catalogController,
    diasController,
    alimentosController,
    sensacionesController,
  };
}
