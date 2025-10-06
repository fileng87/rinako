import { Events } from 'discord.js';

import { Event } from '@/core';
import logger from '@/libs/utils/logger';

export const clientReady = new Event({
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    logger.info(`Ready! Logged in as ${client.user.tag}`);
  },
});
