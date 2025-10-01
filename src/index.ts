import { env } from '@/config';
import { Bot } from '@/core';

const rinako = new Bot();

rinako.handleEvents();
rinako.handleAndRefreshSlashCommands(
  env.DISCORD_TOKEN,
  env.DISCORD_CLIENT_ID,
  env.DISCORD_GUILD_ID,
);
rinako.login(env.DISCORD_TOKEN);
