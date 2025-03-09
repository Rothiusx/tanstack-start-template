import type { User } from '@/auth'
import { signOut } from '@/auth/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Link, useRouter } from '@tanstack/react-router'
import { LogIn } from 'lucide-react'
import { toast } from 'sonner'

export function UserMenu({ user }: { user: User | undefined }) {
  const router = useRouter()

  if (!user) {
    return (
      <Link to="/login" className="relative rounded-full">
        <LogIn className="size-8" />
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar className="size-8">
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback className="bg-background uppercase">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.invalidate()
                  toast.info('Signed out successfully')
                },
                onError: () => {
                  toast.error('Failed to sign out')
                },
              },
            })
          }
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
