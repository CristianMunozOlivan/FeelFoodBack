export const env = {
  PORT: Number(process.env.PORT ?? 3000),
  DB_URL: process.env.DB_URL ,
  JWT_SECRET: process.env.JWT_SECRET ?? 'AHawEdaad024',
  JWT_EXPIRES_IN: '1d',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
};
