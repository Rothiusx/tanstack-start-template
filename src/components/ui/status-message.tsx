import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { BadgeCheck, Info, TriangleAlert } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

const messageVariants = cva(
  'flex w-full items-center gap-4 rounded-lg p-4 py-3',
  {
    variants: {
      variant: {
        success: 'bg-success/10 text-success-foreground',
        error: 'bg-destructive/10 text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  },
)

function getIcon({ variant }: VariantProps<typeof messageVariants>) {
  switch (variant) {
    case 'success':
      return <BadgeCheck className="size-6" />
    case 'error':
      return <TriangleAlert className="size-6" />
    default:
      return <Info className="size-6" />
  }
}

export interface StatusMessageProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof messageVariants> {
  message: string | null | undefined
  duration?: number
}

export function StatusMessage({
  variant,
  message,
  duration = 3000,
}: StatusMessageProps) {
  const [visible, setVisible] = useState(!!message)

  useEffect(() => {
    if (message) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [message, duration])

  if (!message) {
    return null
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={cn(messageVariants({ variant }))}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, type: 'easeIn' }}
        >
          {getIcon({ variant })}
          <span className="text-sm font-semibold">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
