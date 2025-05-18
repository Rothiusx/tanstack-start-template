import { createSchemaFactory } from 'drizzle-zod'
import { z } from 'zod'
import { user } from '@/db/schema'

const { createInsertSchema, createSelectSchema } = createSchemaFactory({
  coerce: {
    number: true,
  },
})

/**
 * User select schema and type
 */
export const userSelectSchema = createSelectSchema(user)

export type UserSelect = z.infer<typeof userSelectSchema>

/**
 * User insert schema and type
 */
export const userInsertSchema = createInsertSchema(user)

export type UserInsert = z.infer<typeof userInsertSchema>

/**
 * User update schema and type
 */
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

/**
 * Sign in schema
 */
export const signInSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Invalid email address',
  }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
  rememberMe: z.boolean().default(false),
})

/**
 * Sign up schema
 */
export const signUpSchema = signInSchema
  .omit({ rememberMe: true })
  .extend({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    confirmPassword: z.string(),
    image: z
      .any()
      .refine(
        (file) => file instanceof File && file.size < 3_000_000,
        'Max 3MB upload size.',
      )
      .transform((file) => (file instanceof File ? file : undefined))
      .optional(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match!",
    path: ['confirmPassword'],
  })
