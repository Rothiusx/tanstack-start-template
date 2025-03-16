import env from '@/env'
import { neonDb } from './neon'
import { postgresDb } from './postgres'

export const db = env.NODE_ENV === 'production' ? neonDb : postgresDb
