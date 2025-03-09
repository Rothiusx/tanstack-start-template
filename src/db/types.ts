import type * as schema from './schemas'
import type { user } from './schemas/auth'
import type { todo } from './schemas/todo'

// Base types from tables using newer $inferSelect method
export type Todo = typeof todo.$inferSelect
export type User = typeof user.$inferSelect

// Type with relations
export type TodoWithUser = Todo & {
  user: User
}

// Generic type helper for getting types with relations
export type WithRelations<
  T extends keyof typeof schema,
  R extends Record<string, keyof typeof schema>,
> = (typeof schema)[T] extends { $inferSelect: infer U }
  ? U & {
      [K in keyof R]: (typeof schema)[R[K]] extends { $inferSelect: infer V }
        ? V
        : never
    }
  : never
