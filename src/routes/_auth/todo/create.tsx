import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TodoCreateForm } from './components/todo-create-form'

export const Route = createFileRoute('/_auth/todo/create')({
  head: () => ({
    meta: [
      {
        title: 'Create Todo',
      },
    ],
  }),
  component: TodoCreate,
})

function TodoCreate() {
  return (
    <div className="container max-w-3xl py-10">
      <div className="relative">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-70 blur-xl"></div>
        <Card className="relative border shadow-xl">
          <CardHeader className="space-y-4 pb-2">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="p-6" asChild>
                <Link to="/todo">
                  <ArrowLeft className="size-10" />
                </Link>
              </Button>
              <div>
                <CardTitle className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold text-transparent">
                  Create New Task
                </CardTitle>
                <CardDescription className="mt-1 text-base text-muted-foreground">
                  Add a new task to your productivity journey
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="p-6 backdrop-blur-sm">
              <TodoCreateForm />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
