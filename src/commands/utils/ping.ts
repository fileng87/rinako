import { SlashCommandBuilder } from 'discord.js';

import { SlashCommand } from '@/core';

export default new SlashCommand({
  data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
  execute: async (interaction) => {
    await interaction.reply(`Pong! \`${interaction.client.ws.ping}ms\``);
  },
});
