import { createServer } from './app/server';
import { env } from './app/env';

const app = createServer();

app.listen(env.PORT, () => {
  console.log(`API escuchando en http://localhost:${env.PORT}`);
});
