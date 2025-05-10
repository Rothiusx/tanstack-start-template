import type { getUsers } from '@/server/users'
import type { ColumnDef } from '@tanstack/react-table'
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
import { getUsersOptions } from '@/server/users'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Ban, CheckCircle2 } from 'lucide-react'
import { UsersActions } from './users-actions'

const columns: ColumnDef<Awaited<ReturnType<typeof getUsers>>[number]>[] = [
  {
    accessorKey: 'image',
    header: undefined,
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage
          src={row.original.image ?? undefined}
          alt={row.original.name}
        />
        <AvatarFallback className="uppercase">
          {row.original.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
    ),
    maxSize: 48,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.role || 'user'}
      </Badge>
    ),
  },
  {
    accessorKey: 'banned',
    header: 'Status',
    cell: ({ row }) => (
      <>
        {row.original.banned === true ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-destructive-foreground">
                <Ban className="mr-2 size-5" />
                <span>Banned</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reason: {row.original.banReason || 'No reason provided'}</p>
              {row.original.banExpires && (
                <p>
                  Expires: <FormatDate date={row.original.banExpires} />
                </p>
              )}
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center text-success-foreground">
            <CheckCircle2 className="mr-2 size-5" />
            <span>Active</span>
          </div>
        )}
      </>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Joined',
    cell: ({ row }) => <FormatDate date={row.original.createdAt} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => <UsersActions user={row.original} />,
  },
]

export function UsersList() {
  const { data: users } = useSuspenseQuery(getUsersOptions())

  return (
    <>
      {users?.length > 0 ? (
        users.length > 250 ? (
          <div className="min-w-[max(50vw,300px)]">
            <DataTable columns={columns} data={users} />
          </div>
        ) : (
          <ScrollArea>
            <div className="min-w-[max(50vw,300px)]">
              <DataTable columns={columns} data={users} />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )
      ) : (
        <p className="py-8 text-center text-muted-foreground">No users found</p>
      )}
    </>
  )
}
