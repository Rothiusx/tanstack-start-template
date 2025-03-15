import { db } from '@/db'
import { todo } from '@/db/schema'
import { sleep } from '@/lib/utils'
import { authMiddleware } from '@/middleware/auth'
import {
  todoCreateFormSchema,
  todoSelectSchema,
  todoUpdateFormSchema,
} from '@/validation/todo'
import { queryOptions } from '@tanstack/react-query'
import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { setResponseStatus } from '@tanstack/react-start/server'
import { and, desc, DrizzleError, eq } from 'drizzle-orm'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

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

      await sleep()

      return result
    } catch (error) {
      console.error(error)
      throw error instanceof DrizzleError
        ? error
        : new Error('Failed to get todos')
    }
  })

export function getTodosOptions() {
  return queryOptions({
    queryKey: ['todos'],
    queryFn: ({ signal }) => getTodos({ signal }),
  })
}

/**
 * ! Server function to get a todo by id
 */
export const getTodo = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .validator(todoSelectSchema.pick({ id: true }))
  .handler(async ({ data, context }) => {
    try {
      const result = await db.query.todo.findFirst({
        where: and(
          eq(todo.id, data.id),
          eq(todo.userId, context.session.user.id),
        ),
        with: {
          user: {
            columns: {
              name: true,
              image: true,
            },
          },
        },
      })

      await sleep()

      if (!result) {
        throw notFound({
          data: {
            message: `Todo #${data.id} not found on the server`,
          },
        })
      }

      return result
    } catch (error) {
      console.error(error)
      throw error instanceof DrizzleError
        ? error
        : new Error('Failed to get todo')
    }
  })

export type Todo = Awaited<ReturnType<typeof getTodo>>

export function getTodoOptions(id: Todo['id']) {
  return queryOptions({
    queryKey: ['todo', id],
    queryFn: ({ signal }) => getTodo({ data: { id }, signal }),
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

      return {
        data: {
          ...result[0],
          user: {
            name: context.session.user.name,
            image: context.session.user.image ?? null,
          },
        },
        message: 'Todo created successfully',
      }
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
  .validator(todoSelectSchema.pick({ id: true, userId: true }))
  .handler(async ({ data, context }) => {
    if (data.userId !== context.session.user.id) {
      setResponseStatus(StatusCodes.FORBIDDEN)
      return {
        message: ReasonPhrases.FORBIDDEN,
      }
    }

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
        setResponseStatus(StatusCodes.FORBIDDEN)
        return {
          message: ReasonPhrases.FORBIDDEN,
        }
      }

      const result = await db
        .update(todo)
        .set({
          title: data.title,
          description: data.description,
          project: data.project,
          language: data.language,
          updatedAt: new Date(),
          completed: data.completed,
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
