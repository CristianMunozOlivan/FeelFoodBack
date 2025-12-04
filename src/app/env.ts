import 'dotenv/config';

// Helper para obligar a que ciertas vars existan
const getRequiredEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 3000),
  DATABASE_URL: getRequiredEnv('DATABASE_URL'),
  JWT_SECRET: process.env.JWT_SECRET ?? 'AHawEdaad024',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1d',
};
