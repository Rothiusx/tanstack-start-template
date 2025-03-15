import { relations } from 'drizzle-orm'
import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { user } from './auth'
import { languageEnum } from './language'

export const todo = pgTable('todo', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  project: text('project', {
    enum: ['tanstack', 'next', 'svelte', 'solid', 'angular', 'vue'],
  }),
  language: languageEnum('language').notNull().default('en'),
  completed: boolean('completed').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const todoRelations = relations(todo, ({ one }) => ({
  user: one(user, { fields: [todo.userId], references: [user.id] }),
}))
