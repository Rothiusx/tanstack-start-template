import { relations } from 'drizzle-orm'
import { user } from './auth'
import { todo } from './todo'

export const userRelations = relations(user, ({ many }) => ({
  todos: many(todo),
}))

export const todoRelations = relations(todo, ({ one }) => ({
  user: one(user, {
    fields: [todo.userId],
    references: [user.id],
  }),
}))
