import { defineConfig } from 'drizzle-kit'
import { env } from '@/env'

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema',
  dialect: 'postgresql',
  strict: true,
  verbose: true,
  casing: 'snake_case',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
