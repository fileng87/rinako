import { z } from 'zod';

import logger from './utils/logger';

const envSchema = z.object({
  DISCORD_TOKEN: z.string(),
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_GUILD_ID: z.string(),
  DATABASE_URL: z.string().default('rinako.db'),
});

export const env = envSchema.parse(process.env);

// 避免重複顯示 DISCORD_TOKEN，僅顯示前 5 碼，其他環境變數正常顯示
const { DISCORD_TOKEN, ...restEnv } = env;
logger.debug('Environment variables:', {
  DISCORD_TOKEN: DISCORD_TOKEN.slice(0, 5) + '...',
  ...restEnv,
});
