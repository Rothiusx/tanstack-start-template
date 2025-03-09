import type { TodoWithUser } from '@/schemas/todo'
import type { ColumnDef } from '@tanstack/react-table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/data-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { getTodosOptions } from '@/server/functions/todo'
import { useSuspenseQuery } from '@tanstack/react-query'
import { CircleCheckBig, CircleX } from 'lucide-react'
import { TodoListActions } from './todo-list-actions'
import { TodoProjectLabel } from './todo-project-label'

const columns: ColumnDef<TodoWithUser>[] = [
  {
    accessorKey: 'user.image',
    header: undefined,
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.user.image ?? undefined} />
        <AvatarFallback className="uppercase">
          {row.original.user.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: 'user.name',
    header: 'User',
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'project',
    header: 'Project',
    cell: ({ row }) => <TodoProjectLabel project={row.original.project} />,
  },
  {
    accessorKey: 'language',
    header: 'Language',
    cell: ({ row }) => (
      <Badge variant="outline" className="uppercase">
        {row.original.language}
      </Badge>
    ),
  },
  {
    accessorKey: 'completed',
    header: 'Completed',
    cell: ({ row }) => (
      <>
        {row.original.completed ? (
          <CircleCheckBig className="text-success-foreground size-6" />
        ) : (
          <CircleX className="text-destructive-foreground size-6" />
        )}
      </>
    ),
  },
  {
    accessorFn: (row) => row.createdAt.toLocaleString(),
    header: 'Created',
  },
  {
    accessorFn: (row) => row.updatedAt.toLocaleString(),
    header: 'Updated',
  },
  {
    id: 'actions',
    cell: ({ row }) => <TodoListActions id={row.original.id} />,
  },
]

export function TodoList() {
  const { data: todos } = useSuspenseQuery(getTodosOptions())

  return (
    <>
      {todos.length > 0 ? (
        <div className=" ">
          <ScrollArea>
            <DataTable columns={columns} data={todos} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      ) : (
        <p className="text-muted-foreground py-8 text-center">No todos found</p>
      )}
    </>
  )
}
