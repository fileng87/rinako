import type {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';

interface SlashCommandOptions {
  data:
    | SlashCommandBuilder
    | SlashCommandOptionsOnlyBuilder
    | SlashCommandSubcommandsOnlyBuilder;
  enabled?: boolean;
  guildOnly?: boolean;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export class SlashCommand {
  data: SlashCommandOptions['data'];
  enabled: boolean;
  guildOnly: boolean;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;

  constructor(options: SlashCommandOptions) {
    this.data = options.data;
    this.enabled = options.enabled ?? true;
    this.guildOnly = options.guildOnly ?? false;
    this.execute = options.execute;
  }
}
