import type { z } from 'zod'
import { user } from '@/db/schemas/auth'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const userInsertSchema = createInsertSchema(user)

export type UserInsert = z.infer<typeof userInsertSchema>

export const userSelectSchema = createSelectSchema(user)

export type UserSelect = z.infer<typeof userSelectSchema>
