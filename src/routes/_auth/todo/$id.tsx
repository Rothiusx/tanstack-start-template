import { NotFound } from '@/components/common/not-found'
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
import { todoSelectSchema } from '@/validation/todo'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { ArrowLeft, Edit } from 'lucide-react'
import { z } from 'zod'
import { TodoUpdateForm } from './components/todo-update-form'
import { TodoView } from './components/todo-view'

export const Route = createFileRoute('/_auth/todo/$id')({
  params: todoSelectSchema.pick({ id: true }),
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
    <div className="container max-w-3xl py-10">
      <div className="relative">
        <div className="from-primary/20 via-secondary/20 to-primary/20 absolute -inset-1 rounded-xl bg-gradient-to-r opacity-70 blur-xl"></div>
        <Card className="relative border shadow-xl">
          <CardHeader className="space-y-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="p-6" asChild>
                  <Link to="/todo">
                    <ArrowLeft className="size-10" />
                  </Link>
                </Button>
                <div>
                  <CardTitle className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                    {todo.title}
                    <p className="text-muted-foreground mt-1 text-xs font-normal">
                      Created by {todo.user.name}
                    </p>
                  </CardTitle>
                </div>
              </div>
              <Button
                variant={edit ? 'outline' : 'default'}
                size="sm"
                className={edit ? '' : 'flex items-center gap-1.5'}
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
                    <Edit className="size-4" /> Edit
                  </>
                )}
              </Button>
            </div>
            <CardDescription className="flex items-center gap-2 text-sm">
              <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-medium">
                Todo #{todo.id}
              </span>
              <span className="text-muted-foreground">
                Created on{' '}
                {new Date(todo.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-12 py-4">
            <div className="rounded-lg backdrop-blur-sm">
              {edit ? <TodoUpdateForm todo={todo} /> : <TodoView todo={todo} />}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TodoPending() {
  return (
    <div className="container max-w-3xl py-10">
      <div className="relative">
        <div className="from-primary/20 via-secondary/20 to-primary/20 absolute -inset-1 rounded-xl bg-gradient-to-r opacity-70 blur-xl"></div>
        <Card className="relative border shadow-xl">
          <CardHeader className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-7 w-48" />
                  <Skeleton className="mt-2 h-4 w-32" />
                </div>
              </div>
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
            <div className="mt-4">
              <Skeleton className="h-5 w-40 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-3/4 rounded-md" />
              <Skeleton className="h-8 w-5/6 rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
          </CardContent>
        </Card>
      </div>
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
