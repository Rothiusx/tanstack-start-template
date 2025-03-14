import type { TodoWithUser } from '@/schemas/todo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/utils'
import { CalendarDays, CheckCircle2, Clock, XCircle } from 'lucide-react'
import { TodoProjectLabel } from './todo-project-label'

export function TodoView({ todo }: { todo: TodoWithUser }) {
  console.log(todo)
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 rounded-lg border p-4">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={todo.user.image ?? undefined}
            alt={todo.user.name}
          />
          <AvatarFallback className="uppercase">
            {todo.user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">Created by</h3>
          <p className="text-muted-foreground">{todo.user.name}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-muted-foreground text-sm font-medium">
          Description
        </h3>
        <p className="text-base">
          {todo.description || 'No description provided'}
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <h3 className="text-muted-foreground text-sm font-medium">Project</h3>
          <div className="flex items-center">
            <TodoProjectLabel project={todo.project} />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-muted-foreground text-sm font-medium">
            Language
          </h3>
          <Badge variant="outline" className="uppercase">
            {todo.language}
          </Badge>
        </div>

        <div className="space-y-2">
          <h3 className="text-muted-foreground text-sm font-medium">Status</h3>
          <div className="flex items-center">
            {todo.completed ? (
              <div className="text-success-foreground flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                <span>Completed</span>
              </div>
            ) : (
              <div className="text-destructive-foreground flex items-center">
                <XCircle className="mr-2 h-5 w-5" />
                <span>Not Completed</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="text-muted-foreground flex items-center">
          <CalendarDays className="mr-2 h-5 w-5" />
          <span>Created: {formatDate(todo.createdAt)}</span>
        </div>

        <div className="text-muted-foreground flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          <span>Updated: {formatDate(todo.updatedAt)}</span>
        </div>
      </div>
    </div>
  )
}
