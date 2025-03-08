import { todo } from '@/db/schemas/todo'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const todoInsertSchema = createInsertSchema(todo, {
  title: (schema) =>
    schema
      .min(1, { message: 'Title is required' })
      .max(64, { message: 'Title is too long' }),
  description: (schema) =>
    schema
      .min(1, { message: 'Description is required' })
      .max(255, { message: 'Description is too long' })
      .nullable()
      .or(z.literal('').transform(() => null)),
})

export type TodoInsert = z.infer<typeof todoInsertSchema>

export const todoSelectSchema = createSelectSchema(todo)

export type TodoSelect = z.infer<typeof todoSelectSchema>
