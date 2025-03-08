import { TodoList } from '@/components/todo/todo-list'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getTodosOptions } from '@/server/functions/todo'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ClipboardList, PlusCircle } from 'lucide-react'
import { Suspense } from 'react'

export const Route = createFileRoute('/_auth/todo/')({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(getTodosOptions())
  },
  component: Todo,
})

function Todo() {
  return (
    <div className="container mx-auto flex flex-col gap-6 py-8">
      <div className="space-y-2">
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          <ClipboardList className="size-8" />
          Todo Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your tasks efficiently and stay organized.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Tasks</h2>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="flex items-center gap-2 font-medium"
              asChild
            >
              <Link to="/todo/create">
                <PlusCircle className="size-5" />
                Create Todo
              </Link>
            </Button>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="min-w-[max(50vw,300px)]">
              <div className="space-y-2">
                <Skeleton className="h-10 w-full rounded-md" />
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-md" />
                ))}
              </div>
            </div>
          }
        >
          <TodoList />
        </Suspense>
      </div>
    </div>
  )
}
