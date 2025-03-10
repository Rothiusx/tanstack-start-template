import { user } from '@/db/schemas/auth'
import { createSchemaFactory } from 'drizzle-zod'
import { z } from 'zod'

const { createInsertSchema, createSelectSchema } = createSchemaFactory({
  coerce: {
    number: true,
  },
})

export const userInsertSchema = createInsertSchema(user)

export type UserInsert = z.infer<typeof userInsertSchema>

export const userSelectSchema = createSelectSchema(user)

export type UserSelect = z.infer<typeof userSelectSchema>

export const userUpdateSchema = createInsertSchema(user, {
  name: (schema) =>
    schema.min(1, { message: 'Name is required' }).max(32, {
      message: 'Name is too long',
    }),
  email: (schema) => schema.email({ message: 'Invalid email address' }),
  age: (schema) =>
    schema
      .int({ message: 'Age must be a number' })
      .positive({ message: 'Age must be positive number' })
      .min(18, { message: 'You must be at least 18 years old.' })
      .max(100, {
        message: 'You are too old',
      })
      .nullable()
      .or(z.literal('').transform(() => null)),
  city: (schema) =>
    schema
      .min(2, { message: 'City is required' })
      .max(32, {
        message: 'City is too long',
      })
      .nullable()
      .or(z.literal('').transform(() => null)),
  language: (schema) =>
    schema.nullable().or(z.literal('none').transform(() => null)),
}).pick({
  name: true,
  age: true,
  city: true,
  email: true,
  language: true,
})

export type UserUpdate = z.infer<typeof userUpdateSchema>
