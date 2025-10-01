import {
  Client,
  Collection,
  GatewayIntentBits,
  REST,
  Routes,
} from 'discord.js';

import logger from '@/utils/logger';

import type { SlashCommand } from './SlashCommand';

export class Bot extends Client {
  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });

    this.slashCommands = new Collection();
    this.cooldowns = new Collection();
  }

  public async handleEvents() {
    const events = (await import('@/events')).default;

    logger.debug(`Imported events:`, {
      events: events.map((event) => event.name),
    });

    for (const event of events) {
      if (!event.enabled) continue;

      if (event.once) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.once(event.name, (...args) => event.execute(...(args as any)));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.on(event.name, (...args) => event.execute(...(args as any)));
      }
    }
  }

  public async handleAndRefreshSlashCommands(
    token: string,
    clientId: string,
    guildId: string,
  ) {
    const slashCommands = (await import('@/commands')).default;

    logger.debug(`Imported slash commands:`, {
      slashCommands: slashCommands.map(
        (slashCommand) => slashCommand.data.name,
      ),
    });

    for (const slashCommand of slashCommands) {
      if (!slashCommand.enabled) continue;

      this.slashCommands.set(slashCommand.data.name, slashCommand);
    }

    const rest = new REST().setToken(token);

    try {
      // transform slash commands to JSON
      const guildSlashCommands = slashCommands
        .filter((slashCommand) => slashCommand.guildOnly)
        .map((slashCommand) => slashCommand.data.toJSON());
      const globalSlashCommands = slashCommands
        .filter((slashCommand) => !slashCommand.guildOnly)
        .map((slashCommand) => slashCommand.data.toJSON());

      // register guild slash commands
      const guildData = (await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: guildSlashCommands },
      )) as [];

      // register global slash commands
      const globalData = (await rest.put(Routes.applicationCommands(clientId), {
        body: globalSlashCommands,
      })) as [];

      logger.info(
        `Successfully refreshed ${globalData.length ?? 0} global and ${guildData.length ?? 0} guild (/) commands.`,
      );
    } catch (error) {
      console.error(error);
    }
  }
}

declare module 'discord.js' {
  interface Client {
    slashCommands: Collection<string, SlashCommand>;
    cooldowns: Collection<string, Collection<string, number>>;
  }
}
