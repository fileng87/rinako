import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';

import { env } from '@/config';

const sqlite = new Database(env.DATABASE_URL);
const db = drizzle(sqlite);

export default db;
