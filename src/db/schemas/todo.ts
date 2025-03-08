import { sql } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const todo = sqliteTable('todo', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text(),
  project: text({
    enum: ['tanstack', 'nextjs', 'svelte', 'solid', 'angular', 'vue'],
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
