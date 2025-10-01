import type {
  ChatInputCommandInteraction,
  InteractionReplyOptions,
  MessagePayload,
} from 'discord.js';

export function forceReply(
  interaction: ChatInputCommandInteraction,
  options: string | MessagePayload | InteractionReplyOptions,
) {
  if (interaction.replied || interaction.deferred) {
    return interaction.followUp(options);
  }
  return interaction.reply(options);
}
