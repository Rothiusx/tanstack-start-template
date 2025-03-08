import type { TodoSelect } from '@/schemas/todo'
import { db } from '@/db'
import { todo } from '@/db/schemas'
import { authMiddleware } from '@/middleware/auth'
import { queryClient } from '@/router'
import { todoInsertSchema, todoSelectSchema } from '@/schemas/todo'
import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { desc, DrizzleError, eq } from 'drizzle-orm'
/**
 * ! Server function to get all todos
 */
export const getTodos = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async () => {
    try {
      const result = await db.query.todo.findMany({
        orderBy: [desc(todo.createdAt)],
      })
      return result
    } catch (error) {
      console.error(error)
      throw new Error(
        error instanceof DrizzleError ? error.message : 'Failed to get todos',
      )
    }
  })

export function getTodosOptions() {
  return queryOptions({
    queryKey: ['todos'],
    queryFn: () => getTodos(),
  })
}

/**
 * ! Server function to get a todo by id
 */
export const getTodo = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .validator(todoSelectSchema.pick({ id: true }))
  .handler(async ({ data }) => {
    try {
      const result = await db.query.todo.findFirst({
        where: eq(todo.id, data.id),
      })
      return result
    } catch (error) {
      console.error(error)
      throw new Error(
        error instanceof DrizzleError
          ? error.message
          : `Failed to get todo ID: ${data.id}`,
      )
    }
  })

export function getTodoOptions(id: TodoSelect['id']) {
  return queryOptions({
    queryKey: ['todo', id],
    queryFn: () => getTodo({ data: { id } }),
    initialData: () => {
      const todos = queryClient.getQueryData(getTodosOptions().queryKey)
      return todos?.find((todo) => todo.id === id)
    },
  })
}

/**
 * ! Server function to create a todo
 */
export const createTodo = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(todoInsertSchema)
  .handler(async ({ data }) => {
    try {
      const result = await db.insert(todo).values(data).returning()
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { data: result[0], message: 'Todo created successfully' }
    } catch (error) {
      console.error(error)
      throw new Error(
        error instanceof DrizzleError ? error.message : 'Failed to create todo',
      )
    }
  })

/**
 * ! Server function to delete a todo by id
 */
export const deleteTodo = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(todoSelectSchema.pick({ id: true }))
  .handler(async ({ data }) => {
    try {
      await db.delete(todo).where(eq(todo.id, data.id))
      return {
        message: `Todo ID: ${data.id} deleted successfully`,
      }
    } catch (error) {
      console.error(error)
      throw new Error(
        error instanceof DrizzleError
          ? error.message
          : `Failed to delete todo ID: ${data.id}`,
      )
    }
  })
