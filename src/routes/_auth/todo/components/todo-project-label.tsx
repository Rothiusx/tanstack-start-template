import type { TodoSelect } from '@/validation/todo'
import { AngularIcon } from '@/components/icons/angular'
import { NextIcon } from '@/components/icons/next'
import { SolidIcon } from '@/components/icons/solid'
import { SvelteIcon } from '@/components/icons/svelte'
import { TanStackIcon } from '@/components/icons/tanstack'
import { VueIcon } from '@/components/icons/vue'
import { cn } from '@/lib/utils'
import { CircleHelp } from 'lucide-react'

// eslint-disable-next-line react-refresh/only-export-components
export const projects = {
  angular: {
    label: 'Angular',
    icon: <AngularIcon className="size-4" />,
  },
  next: {
    label: 'Next.js',
    icon: <NextIcon className="size-4" />,
  },
  solid: {
    label: 'SolidJS',
    icon: <SolidIcon className="size-4" />,
  },
  svelte: {
    label: 'Svelte',
    icon: <SvelteIcon className="size-4" />,
  },
  tanstack: {
    label: 'TanStack Start',
    icon: <TanStackIcon className="size-4" />,
  },
  vue: {
    label: 'Vue.js',
    icon: <VueIcon className="size-4" />,
  },
}

export function TodoProjectLabel({
  project,
  className,
}: React.ComponentProps<'div'> & {
  project: TodoSelect['project']
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2',
        !project && 'text-muted-foreground',
        className,
      )}
    >
      {project ? (
        <>
          {projects[project].icon}
          {projects[project].label}
        </>
      ) : (
        <>
          <CircleHelp className="size-4" />
          Unspecified
        </>
      )}
    </div>
  )
}
