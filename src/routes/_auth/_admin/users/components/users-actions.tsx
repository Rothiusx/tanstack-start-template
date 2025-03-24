import type { getUsers } from '@/server/users'
import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/use-user'
import { Ban, FilePenLine, ShieldCheck } from 'lucide-react'

export function UsersActions({
  user,
}: {
  user: Awaited<ReturnType<typeof getUsers>>[number]
}) {
  const currentUser = useUser()

  // Disable actions for non-admin users or if the user is trying to modify themselves
  const disabled = currentUser?.role !== 'admin' || user.id === currentUser?.id

  return (
    <div className="flex w-full flex-row justify-end gap-2">
      <Button variant="secondary" size="sm" disabled={disabled}>
        <FilePenLine className="size-5" />
      </Button>

      {user.banned === true ? (
        <Button variant="outline" size="sm" disabled={disabled}>
          <ShieldCheck className="size-5" />
        </Button>
      ) : (
        <Button variant="destructive" size="sm" disabled={disabled}>
          <Ban className="size-5" />
        </Button>
      )}
    </div>
  )
}
