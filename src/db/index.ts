import { neonDb } from './neon'
import { postgresDb } from './postgres'

export const db = import.meta.env.PROD ? neonDb : postgresDb
