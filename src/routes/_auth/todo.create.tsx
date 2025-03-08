import { CreateTodoForm } from '@/components/todo/create-todo-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/todo/create')({
  component: TodoCreate,
})

function TodoCreate() {
  return (
    <Card className="min-w-[400px]">
      <CardHeader>
        <CardTitle className="text-center">Create Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateTodoForm />
      </CardContent>
    </Card>
  )
}
