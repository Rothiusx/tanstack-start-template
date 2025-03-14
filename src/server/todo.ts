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
import { createServerFn } from '@tanstack/react-start'
import { setResponseStatus } from '@tanstack/react-start/server'
import { desc, DrizzleError, eq } from 'drizzle-orm'
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
      throw new Error(
        error instanceof DrizzleError ? error.message : 'Failed to get todos',
      )
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

      await sleep()

      // if (!result) {
      //   setResponseStatus(StatusCodes.NOT_FOUND)
      //   return {
      //     message: ReasonPhrases.NOT_FOUND,
      //   }
      // }

      return result
    } catch (error) {
      console.error(error)
      throw new Error(
        error instanceof DrizzleError ? error.message : 'Failed to get todo',
      )
    }
  })

export function getTodoOptions(
  id: NonNullable<Awaited<ReturnType<typeof getTodo>>>['id'],
) {
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
