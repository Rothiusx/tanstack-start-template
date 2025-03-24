import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getUsersOptions } from '@/server/users'
import { createFileRoute } from '@tanstack/react-router'
import { Users } from 'lucide-react'
import { Suspense } from 'react'
import { UsersList } from './components/users-list'

export const Route = createFileRoute('/_auth/_admin/users/')({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(getUsersOptions())
  },
  component: UsersPage,
})

function UsersPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Manage users and system settings
        </p>
      </div>

      <Card className="relative border shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-2xl font-bold">
              <Users className="text-primary size-6" />
              Users Management
            </CardTitle>
          </div>
          <CardDescription>
            View and manage user accounts and permissions
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
                      <Skeleton key={key} className="h-12 w-full rounded-md" />
                    )
                  })}
                </div>
              </div>
            }
          >
            <UsersList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
