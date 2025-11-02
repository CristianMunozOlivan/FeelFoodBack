
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
import { ListPlatos, CreatePlato, AddIngredientePlato, ListIngredientesPlato, RemoveIngredientePlato } from '../modules/platos/application/plato.usecases';

// Catálogo
import { PgCatalogRepository } from '../modules/catalog/infra/db/pgCatalog.repository';
import { CatalogController } from '../modules/catalog/infra/http/catalog.controller';
import { ListEstadosAnimo, ListTiposComida } from '../modules/catalog/application/catalog.usecases';

// Días
import { PgDiaRepository } from '../modules/dias/infra/db/pgDia.repository';
import {
  CreateDia, ListDiasByUsuario, CloseDia,
  AddComida, ListComidasDeDia, AddAlimentoAComida, RemoveAlimentoDeComida
} from '../modules/dias/application/dias.usecase';
import { DiasController } from '../modules/dias/infra/http/dias.controller';

// Alimentos
import { PgAlimentoRepository } from '../modules/alimentos/infra/db/pgAlimento.repository';
import { AlimentosController } from '../modules/alimentos/infra/http/alimentos.controller';
import { ListAlimentos } from '../modules/alimentos/application/alimento.useCase';
import { CreateAlimento } from '../modules/alimentos/application/alimento.useCase';

export function buildContainer() {
  // Pool de conexiones compartido 
  const pool = new Pool({
    connectionString: env.DB_URL,
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
const addIngUC = new AddIngredientePlato(platoRepo);
const listIngUC = new ListIngredientesPlato(platoRepo);
const removeIngUC = new RemoveIngredientePlato(platoRepo);
const platosController = new PlatosController(listPlatosUC, createPlatoUC, addIngUC, listIngUC, removeIngUC);

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
  const diasController = new DiasController(
    createDiaUC, listDiasUC, closeDiaUC, addComidaUC, listComidasUC, addConsumoUC, removeConsumoUC
  );

  // Alimentos → con casos de uso inyectados (repo requiere pool)
  const alimentoRepo = new PgAlimentoRepository(pool);
  const listAlimentosUC = new ListAlimentos(alimentoRepo);
  const createAlimentoUC = new CreateAlimento(alimentoRepo);
  const alimentosController = new AlimentosController(listAlimentosUC, createAlimentoUC);

  return {
    authController,
    platosController,
    catalogController,
    diasController,
    alimentosController,
  };
}
