import env from '@/env'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schemas'

const client = createClient({ url: env.DATABASE_URL! })
export const db = drizzle<typeof schema>(client, { schema })
