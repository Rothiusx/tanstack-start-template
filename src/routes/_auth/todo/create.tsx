import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
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
        <div className="from-primary/20 via-secondary/20 to-primary/20 absolute -inset-1 rounded-xl bg-gradient-to-r opacity-70 blur-xl"></div>
        <Card className="relative border shadow-xl">
          <CardHeader className="space-y-4 pb-2">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="bg-background/80 hover:bg-background/90 rounded-full shadow-sm transition-all"
                asChild
              >
                <Link to="/todo">
                  <ArrowLeft className="size-5" />
                </Link>
              </Button>
              <div>
                <CardTitle className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                  Create New Task
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-1 text-base">
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
