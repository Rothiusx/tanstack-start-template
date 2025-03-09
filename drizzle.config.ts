import env from '@/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schemas',
  dialect: 'sqlite',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
