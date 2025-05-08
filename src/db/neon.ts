import { env } from '@/env'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

const client = neon(env.DATABASE_URL)
export const neonDb = drizzle({ client, schema })
