import { TodoUpdateForm } from '@/components/todo/todo-update-form'
import { TodoView } from '@/components/todo/todo-view'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getTodoOptions } from '@/server/functions/todo'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Edit } from 'lucide-react'
import { z } from 'zod'

export const Route = createFileRoute('/_auth/todo/$id')({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  validateSearch: z.object({
    edit: z.boolean().default(false),
  }),
  loader: async ({ context, params }) => {
    context.queryClient.ensureQueryData(getTodoOptions(params.id))
  },
  component: TodoDetail,
})

function TodoDetail() {
  const { id } = Route.useParams()
  const { edit } = Route.useSearch()
  const navigate = Route.useNavigate()
  const { data: todo } = useSuspenseQuery(getTodoOptions(id))

  if (!todo) {
    return (
      <div className="py-8 text-center">
        <h2 className="mb-2 text-xl font-semibold">Todo Not Found</h2>
        <p className="text-muted-foreground">
          The requested todo item could not be found.
        </p>
      </div>
    )
  }

  const toggleEdit = () => {
    navigate({
      search: { edit: !edit },
      replace: true,
    })
  }

  return (
    <div className="container max-w-3xl py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="p-6" asChild>
                <Link to="/todo">
                  <ArrowLeft className="size-8" />
                </Link>
              </Button>
              <div>
                <CardTitle>{todo.title}</CardTitle>
                {todo.user && (
                  <CardDescription className="mt-1">
                    Created by {todo.user.name}
                  </CardDescription>
                )}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={toggleEdit}>
              {edit ? (
                'Cancel'
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </>
              )}
            </Button>
          </div>
          <CardDescription>
            Todo #{todo.id} - Created on{' '}
            {new Date(todo.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {edit ? <TodoUpdateForm todo={todo} /> : <TodoView todo={todo} />}
        </CardContent>
      </Card>
    </div>
  )
}
