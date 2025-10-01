import type { ClientEvents } from 'discord.js';

interface EventOptions<T extends keyof ClientEvents> {
  name: T;
  once?: boolean;
  enabled?: boolean;
  execute: (...args: ClientEvents[T]) => Promise<void>;
}

export class Event<T extends keyof ClientEvents> {
  name: T;
  once: boolean;
  enabled: boolean;
  execute: (...args: ClientEvents[T]) => Promise<void>;

  constructor(options: EventOptions<T>) {
    this.name = options.name;
    this.once = options.once ?? false;
    this.enabled = options.enabled ?? true;
    this.execute = options.execute;
  }
}
