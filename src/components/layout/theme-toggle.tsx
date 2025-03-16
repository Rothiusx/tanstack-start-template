import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-react'

function setTheme(theme: 'light' | 'dark' | 'system') {
  localStorage.setItem('theme', theme)
  const root = document.documentElement
  root.classList.remove('light', 'dark')

  if (theme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.classList.add(isDark ? 'dark' : 'light')
  } else {
    root.classList.add(theme)
  }
}

// function setTheme(theme: 'light' | 'dark' | 'system') {
//   if (
//     document.documentElement.classList.contains('dark') ??
//     (!('theme' in localStorage) &&
//       window.matchMedia('(prefers-color-scheme: dark)').matches)
//   ) {
//     document.documentElement.classList.remove('dark')
//     localStorage.theme = 'light'
//   } else {
//     document.documentElement.classList.add('dark')
//     localStorage.theme = 'dark'
//   }
// }

export function ThemeToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
