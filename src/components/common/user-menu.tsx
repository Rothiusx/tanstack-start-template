import { useQueryClient } from '@tanstack/react-query'
import { Link, useRouter } from '@tanstack/react-router'
import { CircleUser, CircleUserRound, LogIn, LogOut } from 'lucide-react'
import { toast } from 'sonner'
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
import { useLocale } from '@/hooks/use-locale'
import { useUser } from '@/hooks/use-user'
import { signOut } from '@/lib/auth/client'
import { getUserOptions } from '@/server/auth'

export function UserMenu() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const user = useUser()
  const locale = useLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="ml-4 size-10 rounded-full shadow-sm"
        >
          {user ? (
            <Avatar className="size-full">
              <AvatarImage src={user.image ?? undefined} alt={user.name} />
              <AvatarFallback className="bg-background uppercase">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <CircleUser className="size-8" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {user ? (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-medium">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">
                <CircleUserRound className="size-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={async () => {
                await signOut({
                  fetchOptions: {
                    onSuccess: async () => {
                      await queryClient.invalidateQueries(getUserOptions())
                      await router.invalidate()
                      toast.info('Signed out successfully')
                    },
                    onError: () => {
                      toast.error('Failed to sign out')
                    },
                  },
                })
              }}
            >
              <LogOut className="size-4" />
              Sign out
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link to="/login">
              <LogIn className="size-4" />
              Sign in
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="uppercase" disabled>
          {locale}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
