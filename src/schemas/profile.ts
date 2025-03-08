import { literal, z } from 'zod'

export const updateUserSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(32, {
    message: 'Name is too long',
  }),
  age: z.coerce
    .number()
    .int({ message: 'Age must be a number' })
    .positive({ message: 'Age must be positive number' })
    .min(18, { message: 'You must be at least 18 years old.' })
    .max(100, {
      message: 'You are too old',
    })
    .nullable()
    .or(literal('').transform(() => null)),
  city: z
    .string()
    .min(2, { message: 'City is required' })
    .max(32, {
      message: 'City is too long',
    })
    .nullable()
    .or(literal('').transform(() => null)),
  email: z.string().email({ message: 'Invalid email address' }),
})

export type UpdateUser = z.infer<typeof updateUserSchema>
