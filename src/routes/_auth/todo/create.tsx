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
  component: TodoCreate,
})

function TodoCreate() {
  return (
    <div className="container max-w-3xl py-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Button variant="ghost" size="icon" className="p-6" asChild>
            <Link to="/todo">
              <ArrowLeft className="size-8" />
            </Link>
          </Button>
          <div>
            <CardTitle>Create New Todo</CardTitle>
            <CardDescription>
              Fill in the details to create a new todo item
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <TodoCreateForm />
        </CardContent>
      </Card>
    </div>
  )
}
