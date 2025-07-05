import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface MobileNavProps {
  links: Array<{
    to: string
    label: string
    icon: React.ReactNode
  }>
}

export function MobileNav({ links }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild className="ml-2 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-secondary/80"
        >
          <Menu className="size-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 sm:w-96">
        <div className="h-full bg-gradient-to-br from-background via-secondary/30 to-background/95">
          <SheetHeader className="border-b border-border/40 px-6 pt-8 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-lg">
                <Menu className="size-5 text-primary-foreground" />
              </div>
              <div>
                <SheetTitle className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-2xl font-bold text-transparent">
                  Navigation
                </SheetTitle>
                <SheetDescription>Explore TanStack Start.</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="px-6 py-6">
            <div className="flex flex-col space-y-2">
              {links.map(({ to, label, icon }) => (
                <SheetClose key={to} asChild>
                  <Link
                    to={to}
                    activeProps={{
                      className:
                        'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg scale-105',
                    }}
                    className="group flex items-center gap-4 rounded-xl px-4 py-4 text-base font-medium transition-all duration-200 hover:scale-105 hover:bg-secondary/80 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/50 transition-colors group-hover:bg-secondary/25">
                      {icon}
                    </div>
                    <span className="flex-1">{label}</span>
                  </Link>
                </SheetClose>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
