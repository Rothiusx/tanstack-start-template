import { NotFound } from '@/components/layout/not-found'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getTodoOptions, getTodosOptions } from '@/server/todo'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { ArrowLeft, Edit } from 'lucide-react'
import { z } from 'zod'
import { TodoUpdateForm } from './components/todo-update-form'
import { TodoView } from './components/todo-view'

export const Route = createFileRoute('/_auth/todo/$id')({
  params: z.object({
    id: z.coerce
      .number({ message: 'Id must be a number' })
      .int({ message: 'Id must be a whole number' })
      .positive({ message: 'Id must be positive' })
      .lte(100000, { message: 'Id number is out of range' }),
  }),
  validateSearch: z.object({
    edit: z.boolean().default(false),
  }),
  loader: async ({ context, params }) => {
    const todos = context.queryClient.getQueryData(getTodosOptions().queryKey)
    const initialData = todos?.find((todo) => todo.id === params.id)

    if (initialData && initialData?.userId !== context.user.id) {
      throw redirect({ to: '/todo' })
    }

    const todo = await context.queryClient.ensureQueryData({
      ...getTodoOptions(params.id),
      initialData,
    })

    return { title: todo.title }
  },
  head: ({ loaderData: { title } }) => ({
    meta: [
      {
        title,
      },
    ],
  }),
  pendingComponent: () => <TodoPending />,
  notFoundComponent: ({ data }) => (
    <NotFound data={data}>
      <TodoNotFound />
    </NotFound>
  ),
  // errorComponent: (error) => <DefaultErrorBoundary {...error} />,
  component: TodoDetail,
})

function TodoDetail() {
  const { id } = Route.useParams()
  const { edit } = Route.useSearch()
  const navigate = Route.useNavigate()
  const { data: todo } = useSuspenseQuery(getTodoOptions(id))

  return (
    <section className="container max-w-3xl py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="p-6" asChild>
                <Link to="/todo">
                  <ArrowLeft className="size-8" />
                </Link>
              </Button>
              <CardTitle>
                {todo.title}
                <p className="text-muted-foreground mt-1 text-xs">
                  Created by {todo.user.name}
                </p>
              </CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                navigate({
                  search: { edit: !edit },
                  replace: true,
                })
              }
            >
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
    </section>
  )
}

function TodoPending() {
  return (
    <div className="container max-w-3xl py-8">
      <Card>
        <CardHeader className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-14 rounded-full" />
              <div>
                <Skeleton className="h-7 w-48" />
                <Skeleton className="mt-3 h-5 w-32" />
              </div>
            </div>
            <Skeleton className="h-10 w-28" />
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-5/6" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-4/5" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TodoNotFound() {
  const { id } = Route.useParams()

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg font-semibold">
          Todo #{id} you are looking for does not exist.
        </p>
      </div>
      <Button variant="outline" asChild>
        <Link to="/todo">Go to Todos</Link>
      </Button>
    </>
  )
}
