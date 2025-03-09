import { sql } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './auth'

export const todo = sqliteTable('todo', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  title: text().notNull(),
  description: text(),
  project: text({
    enum: ['tanstack', 'next', 'svelte', 'solid', 'angular', 'vue'],
  }),
  language: text({ enum: ['cs', 'en'] })
    .notNull()
    .default('cs'),
  completed: int({ mode: 'boolean' }).notNull().default(false),
  createdAt: int('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: int('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
})
