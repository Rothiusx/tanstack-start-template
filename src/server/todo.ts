import type { TodoSelect } from '@/schemas/todo'
import { db } from '@/db'
import { todo } from '@/db/schemas'
import { sleep } from '@/lib/utils'
import { authMiddleware } from '@/middleware/auth'
import { queryClient } from '@/router'
import {
  todoCreateFormSchema,
  todoSelectSchema,
  todoUpdateFormSchema,
} from '@/schemas/todo'
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
        with: {
          user: {
            columns: {
              name: true,
              image: true,
            },
          },
        },
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
        with: {
          user: {
            columns: {
              name: true,
              image: true,
            },
          },
        },
      })

      return result
    } catch (error) {
      console.error(error)
      throw new Error(
        error instanceof DrizzleError ? error.message : 'Failed to load todo',
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
  .validator(todoCreateFormSchema)
  .handler(async ({ data, context }) => {
    try {
      const result = await db
        .insert(todo)
        .values({
          userId: context.session.user.id,
          ...data,
        })
        .returning()

      await sleep()

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

      await sleep()

      return {
        message: 'Todo deleted successfully',
      }
    } catch (error) {
      console.error(error)
      throw new Error(
        error instanceof DrizzleError ? error.message : 'Failed to delete todo',
      )
    }
  })

/**
 * ! Server function to update a todo
 */
export const updateTodo = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(todoUpdateFormSchema)
  .handler(async ({ data, context }) => {
    try {
      if (context.session.user.id !== data.userId) {
        throw new Error('Unauthorized')
      }

      const result = await db
        .update(todo)
        .set({
          title: data.title,
          description: data.description,
          project: data.project,
          language: data.language,
          completed: data.completed,
          updatedAt: new Date(),
        })
        .where(eq(todo.id, data.id))
        .returning()

      await sleep()

      return {
        data: result[0],
        message: `Todo ${result[0].title} updated successfully`,
      }
    } catch (error) {
      console.error(error)
      throw new Error(
        error instanceof DrizzleError
          ? error.message
          : `Failed to update todo ${data.title}`,
      )
    }
  })
