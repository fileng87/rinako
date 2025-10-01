import { Events, MessageFlags } from 'discord.js';

import { Event } from '@/core';
import { forceReply } from '@/utils';
import logger from '@/utils/logger';

export const command = new Event({
  name: Events.InteractionCreate,
  execute: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.slashCommands.get(
      interaction.commandName,
    );
    if (!command) {
      logger.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
    try {
      logger.debug(`Executing command ${interaction.commandName}`);
      await command.execute(interaction);
    } catch (error) {
      logger.error(error);
      forceReply(interaction, {
        content: 'There was an error while executing this command!',
        flags: MessageFlags.Ephemeral,
      });
    }
  },
});
