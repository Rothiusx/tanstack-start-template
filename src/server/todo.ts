import { db } from '@/db'
import { todo } from '@/db/schema'
import { tryCatch } from '@/lib/try-catch'
import { sleep } from '@/lib/utils'
import { authMiddleware } from '@/middleware/auth'
import {
  todoCreateFormSchema,
  todoSelectSchema,
  todoUpdateFormSchema,
} from '@/validation/todo'
import { queryOptions } from '@tanstack/react-query'
import { notFound } from '@tanstack/react-router'
import { createServerFn, json } from '@tanstack/react-start'
import { and, desc, eq } from 'drizzle-orm'
import { StatusCodes } from 'http-status-codes'

/**
 * ! Server function to get all todos
 */
export const getTodos = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(async () => {
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
  })

export function getTodoOptions(id: Awaited<ReturnType<typeof getTodo>>['id']) {
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
    const { data: result, error } = await tryCatch(
      db
        .insert(todo)
        .values({
          userId: context.session.user.id,
          ...data,
        })
        .returning(),
    )

    if (error) {
      throw json(
        { message: error.message },
        { status: StatusCodes.UNPROCESSABLE_ENTITY },
      )
    }

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
  })

/**
 * ! Server function to delete a todo by id
 */
export const deleteTodo = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(todoSelectSchema.pick({ id: true, userId: true }))
  .handler(async ({ data, context }) => {
    if (data.userId !== context.session.user.id) {
      throw json(
        { message: 'You are not allowed to delete this todo' },
        { status: StatusCodes.FORBIDDEN },
      )
    }

    const { data: result, error } = await tryCatch(
      db.delete(todo).where(eq(todo.id, data.id)).returning(),
    )

    if (error) {
      throw json(
        { message: 'Unable to delete todo' },
        { status: StatusCodes.UNPROCESSABLE_ENTITY },
      )
    }

    await sleep()

    return {
      message: `Todo ${result[0].title} deleted successfully`,
    }
  })

/**
 * ! Server function to update a todo
 */
export const updateTodo = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(todoUpdateFormSchema)
  .handler(async ({ data, context }) => {
    if (context.session.user.id !== data.userId) {
      throw json(
        { message: 'You are not allowed to update this todo' },
        { status: StatusCodes.FORBIDDEN },
      )
    }

    const { data: result, error } = await tryCatch(
      db
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
        .returning(),
    )

    if (error) {
      throw json(
        { message: 'Unable to update todo' },
        { status: StatusCodes.UNPROCESSABLE_ENTITY },
      )
    }

    await sleep()

    return {
      data: result[0],
      message: `Todo ${result[0].title} updated successfully`,
    }
  })
