import { BetterAuthIcon } from '@/components/icons/better-auth'
import { DrizzleIcon } from '@/components/icons/drizzle'
import { ShadcnIcon } from '@/components/icons/shadcn'
import { TanStackIcon } from '@/components/icons/tanstack'
import { useUser } from '@/hooks/use-user'
import { Link } from '@tanstack/react-router'
import { ClipboardList, Home, Loader2, Menu, ShieldUser } from 'lucide-react'
import { Suspense } from 'react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { ModeToggle } from './mode-toggle'
import { UserMenu } from './user-menu'

export function NavBar() {
  const user = useUser()

  const links = user
    ? [
        {
          to: '/todo' as const,
          label: 'TODO',
          icon: <ClipboardList className="size-6" />,
        },
        ...(user.role === 'admin'
          ? [
              {
                to: '/admin',
                label: 'Admin',
                icon: <ShieldUser className="size-6" />,
              },
            ]
          : []),
      ]
    : []

  return (
    <nav className="bg-secondary text-secondary-foreground m-1 flex h-12 items-center rounded-sm border-b px-4 shadow-lg md:px-6">
      <ul className="flex items-center space-x-4 lg:space-x-6">
        <li>
          <Link to="/" className="mr-6 flex items-center">
            <Home className="size-8" />
          </Link>
        </li>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="size-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <a
                href="https://tanstack.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TanStackIcon className="size-5" />
                TanStack
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href="https://ui.shadcn.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShadcnIcon className="size-5" />
                Shadcn UI
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href="https://better-auth.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BetterAuthIcon className="size-5" />
                Better Auth
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href="https://orm.drizzle.team/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <DrizzleIcon className="size-5" />
                Drizzle ORM
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {links.map(({ to, label, icon }) => (
          <li key={to}>
            <Link
              to={to}
              activeProps={{
                className: 'text-secondary-foreground',
              }}
              className="hover:text-secondary-foreground text-muted-foreground flex items-center gap-2 text-2xl font-medium transition-colors"
            >
              {icon}
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="ml-auto flex items-center space-x-4">
        <span className="mx-4">{user ? user.name : 'Guest'}</span>
        <ModeToggle />
        <Suspense fallback={<Loader2 className="size-9 animate-spin" />}>
          <UserMenu />
        </Suspense>
      </div>
    </nav>
  )
}
