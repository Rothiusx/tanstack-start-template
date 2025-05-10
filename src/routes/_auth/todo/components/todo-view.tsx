import type { getTodo } from '@/server/todo'
import { FormatDate } from '@/components/common/format-date'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CalendarDays, CheckCircle2, Clock, XCircle } from 'lucide-react'
import { TodoProjectLabel } from './todo-project-label'

export function TodoView({
  todo,
}: {
  todo: Awaited<ReturnType<typeof getTodo>>
}) {
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
        <h3 className="text-sm font-medium text-muted-foreground">
          Description
        </h3>
        <p className="text-base">
          {todo.description ?? 'No description provided'}
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Project</h3>
          <div className="flex items-center">
            <TodoProjectLabel project={todo.project} />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Language
          </h3>
          <Badge variant="outline" className="uppercase">
            {todo.language}
          </Badge>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
          <div className="flex items-center">
            {todo.completed ? (
              <div className="flex items-center text-success-foreground">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                <span>Completed</span>
              </div>
            ) : (
              <div className="flex items-center text-destructive-foreground">
                <XCircle className="mr-2 h-5 w-5" />
                <span>Not Completed</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-center text-muted-foreground">
          <CalendarDays className="mr-2 h-5 w-5" />
          <span>
            Created: <FormatDate date={todo.createdAt} />
          </span>
        </div>

        <div className="flex items-center text-muted-foreground">
          <Clock className="mr-2 h-5 w-5" />
          <span>
            Updated: <FormatDate date={todo.updatedAt} />
          </span>
        </div>
      </div>
    </div>
  )
}
