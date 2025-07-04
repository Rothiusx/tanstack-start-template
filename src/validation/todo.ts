import { createSchemaFactory } from 'drizzle-zod'
import { z } from 'zod/v4'
import { todo } from '@/db/schema'

const { createInsertSchema, createSelectSchema } = createSchemaFactory({
  coerce: {
    number: true,
  },
})

/**
 * ! Schema for inserting a todo
 */
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

/**
 * ! Schema for selecting a todo
 */
export const todoSelectSchema = createSelectSchema(todo, {
  id: (schema) =>
    schema
      .int({ message: 'Id must be a whole number' })
      .positive({ message: 'Id must be positive' })
      .lte(100000, { message: 'Id number is out of range' }),
})
export type TodoSelect = z.infer<typeof todoSelectSchema>

/**
 * ! Schema for updating a todo
 */
export const todoUpdateSchema = createInsertSchema(todo, {
  id: (schema) =>
    schema
      .int({ message: 'Id must be a whole number' })
      .positive({ message: 'Id must be positive' })
      .lte(100000, { message: 'Id number is out of range' }),
})
export type TodoUpdate = z.infer<typeof todoUpdateSchema>

/**
 * ! Schema for submitting a todo via form
 */
export const todoCreateFormSchema = todoInsertSchema.pick({
  title: true,
  description: true,
  project: true,
  language: true,
})
export type TodoCreateForm = z.infer<typeof todoCreateFormSchema>

/**
 * ! Schema for updating a todo via form
 */
export const todoUpdateFormSchema = todoUpdateSchema.pick({
  id: true,
  userId: true,
  title: true,
  description: true,
  project: true,
  language: true,
  completed: true,
})
export type TodoUpdateForm = z.infer<typeof todoUpdateFormSchema>
