import { createServer } from './app/server';
import { env } from './app/env';
// Inicia el servidor
const app = createServer();
// Escucha en el puerto configurado
app.listen(env.PORT, () => {
  console.log(`API escuchando en puerto ${env.PORT}`);
});
