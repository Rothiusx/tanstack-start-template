import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  PlusCircle,
} from 'lucide-react'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getTodosOptions } from '@/server/todo'
import { TodoList } from './components/todo-list'

export const Route = createFileRoute('/_auth/todo/')({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(getTodosOptions())
  },
  component: Todo,
})

function Todo() {
  return (
    <div className="container mx-auto flex flex-col gap-6 py-2">
      <div className="space-y-3">
        <h1 className="flex items-center gap-2 text-4xl font-bold tracking-tight">
          <ClipboardList className="size-9 text-primary" />
          Task Manager
        </h1>
        <p className="text-lg text-muted-foreground">
          Your personal productivity hub. Organize, prioritize, and accomplish
          your goals with ease.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg transition-all hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-primary" />
              Stay Organized
            </CardTitle>
            <CardDescription>Track your progress effortlessly</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Create, manage, and complete tasks in one centralized dashboard
              designed for productivity.
            </p>
          </CardContent>
        </Card>

        <Card className="border-secondary/20 bg-gradient-to-br from-secondary/10 to-secondary/5 shadow-lg transition-all hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5 text-primary" />
              Save Time
            </CardTitle>
            <CardDescription>Efficient task management</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Prioritize your workload and focus on what matters most with our
              intuitive interface.
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5 shadow-lg transition-all hover:shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5 text-primary" />
              Plan Ahead
            </CardTitle>
            <CardDescription>Never miss a deadline</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Set due dates, organize by priority, and keep track of upcoming
              tasks with ease.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-70 blur-xl"></div>
        <Card className="relative border shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                <ClipboardList className="size-6 text-primary" />
                Your Tasks
              </CardTitle>
              <Button
                variant="default"
                className="flex items-center gap-2 font-medium"
                asChild
              >
                <Link to="/todo/create">
                  <PlusCircle className="size-5" />
                  Create Task
                </Link>
              </Button>
            </div>
            <CardDescription>
              Manage your tasks and track your progress
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Suspense
              fallback={
                <div className="min-w-[max(50vw,300px)]">
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full rounded-md" />
                    {Array.from({ length: 8 }).map((_, index) => {
                      const key = `skeleton-${index}`
                      return (
                        <Skeleton
                          key={key}
                          className="h-12 w-full rounded-md"
                        />
                      )
                    })}
                  </div>
                </div>
              }
            >
              <TodoList />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
