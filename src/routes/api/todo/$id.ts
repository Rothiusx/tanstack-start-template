import { db } from '@/db'
import { todo } from '@/db/schema'
import { todoSelectSchema } from '@/validation/todo'
import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { setResponseStatus } from '@tanstack/react-start/server'
import { eq } from 'drizzle-orm'
import { StatusCodes } from 'http-status-codes'

export const APIRoute = createAPIFileRoute('/api/todo/$id')({
  GET: async ({ params }) => {
    const safeParams = todoSelectSchema.pick({ id: true }).safeParse(params)

    if (!safeParams.success) {
      return new Response('Invalid ID', {
        status: StatusCodes.BAD_REQUEST,
      })
    }

    const result = await db.query.todo.findFirst({
      where: eq(todo.id, safeParams.data.id),
    })

    if (!result) {
      setResponseStatus(StatusCodes.NOT_FOUND)
      return new Response('Todo not found', {
        status: StatusCodes.NOT_FOUND,
      })
    }

    return json(result)
  },
})
