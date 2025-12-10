import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { buildContainer } from './container';
import { errorHandler } from './errorHandler';
import { env } from './env';

// Routers feature-first
import { buildAuthRouter } from '../modules/auth/infra/http/auth.router';
import { buildCatalogRouter } from '../modules/catalog/infra/http/catalog.router';
import { buildDiasRouter } from '../modules/dias/infra/http/dias.router';
import { buildAlimentosRouter } from '../modules/alimentos/infra/http/alimentos.router';
import { buildPlatosRouter } from '../modules/platos/infra/http/platos.router';
import { buildSensacionesRouter } from '../modules/sensaciones/infra/http/sensaciones.router';
// Auth middleware
import { buildRequireAuth} from '../modules/auth/infra/http/auth.middleware';
import { notFound } from './http/notFound';
import { buildUsuarioRouter } from '../modules/usuario/infra/http/usuario.router';

// Crear y configurar el servidor Express
export function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const {
    authController,
    catalogController,
    diasController,
    alimentosController,
    platosController,
    sensacionesController,
    usuarioController,
  } = buildContainer();

  // Middlewares de auth
  const requireAuth = buildRequireAuth(env.JWT_SECRET);

  // Ruta de health check
  app.get('/health', (_req, res) => res.json({ ok: true }));

  // Públicas
  app.use('/auth', buildAuthRouter(authController));
  app.use('/catalog', buildCatalogRouter(catalogController));

  // Protegidas con JWT
  app.use('/dias', requireAuth, buildDiasRouter(diasController));
  app.use('/alimentos', requireAuth, buildAlimentosRouter(alimentosController));
  app.use('/platos', requireAuth, buildPlatosRouter(platosController));
  app.use('/sensaciones', requireAuth, buildSensacionesRouter(sensacionesController));
  app.use('/usuario', requireAuth, buildUsuarioRouter(usuarioController));

  // Middlewares finales
  app.use(notFound);     // 404 para cualquier ruta no coincidente
  app.use(errorHandler); // manejador de errores final

  return app;
}
