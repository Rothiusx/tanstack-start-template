import type { ColumnDef } from '@tanstack/react-table'
import type { getTodos } from '@/server/todo'
import { useSuspenseQuery } from '@tanstack/react-query'
import { CircleCheckBig, CircleX } from 'lucide-react'
import { FormatDate } from '@/components/common/format-date'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/data-table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { VirtualDataTable } from '@/components/ui/virtual-data-table'
import { getTodosOptions } from '@/server/todo'
import { TodoListActions } from './todo-list-actions'
import { TodoProjectLabel } from './todo-project-label'

const columns: ColumnDef<Awaited<ReturnType<typeof getTodos>>[number]>[] = [
  {
    accessorKey: 'user.image',
    header: undefined,
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage
          src={row.original.user.image ?? undefined}
          alt={row.original.user.name}
        />
        <AvatarFallback className="uppercase">
          {row.original.user.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
    ),
    maxSize: 48,
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
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="max-w-64 truncate">{row.original.description}</p>
        </TooltipTrigger>
        <TooltipContent>{row.original.description}</TooltipContent>
      </Tooltip>
    ),
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
          <CircleCheckBig className="size-6 text-success-foreground" />
        ) : (
          <CircleX className="size-6 text-destructive-foreground" />
        )}
      </>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => <FormatDate date={row.original.createdAt} />,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated',
    cell: ({ row }) => <FormatDate date={row.original.updatedAt} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => <TodoListActions todo={row.original} />,
  },
]

export function TodoList() {
  const { data: todos } = useSuspenseQuery(getTodosOptions())

  return (
    <>
      {todos.length > 0 ? (
        todos.length > 250 ? (
          <VirtualDataTable columns={columns} data={todos} />
        ) : (
          <ScrollArea>
            <DataTable columns={columns} data={todos} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )
      ) : (
        <p className="py-8 text-center text-muted-foreground">No todos found</p>
      )}
    </>
  )
}
