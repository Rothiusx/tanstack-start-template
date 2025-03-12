import { useSession } from '@/hooks/use-session'
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
  const session = useSession()

  const links = session
    ? [
        {
          to: '/todo' as const,
          label: 'TODO',
          icon: <ClipboardList className="size-6" />,
        },
        ...(session.user.role === 'admin'
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
              <a href="https://ui.shadcn.com/">Shadcn UI</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="https://tanstack.com/">TanStack</a>
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
        <ModeToggle />
        <Suspense fallback={<Loader2 className="size-9 animate-spin" />}>
          <UserMenu />
        </Suspense>
      </div>
    </nav>
  )
}
