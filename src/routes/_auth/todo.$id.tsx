import { getTodoOptions } from '@/server/functions/todo'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_auth/todo/$id')({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(getTodoOptions(params.id))
  },
  component: TodoDetail,
})

function TodoDetail() {
  const { id } = Route.useParams()

  return <div>Todo {id}</div>
}
