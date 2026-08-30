import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config({ override: true });

const envSchema = z.object({
  PORT: z.string().default('3000'),
  MONGO_URI: z.string().url().or(z.string().startsWith('mongodb')).default('mongodb://localhost:27017/techyad'),
  JWT_SECRET: z.string().min(10).default('super_secret_key_change_me'),
  JWT_REFRESH_SECRET: z.string().min(10).default('super_secret_refresh_key_change_me'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
