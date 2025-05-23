import type { ComponentProps } from 'react'
import { useRouteContext } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getBrowserLocale } from '@/lib/utils'

// Component to handle date display with SSR and hydration
export function FormatDate({
  date,
  ...props
}: {
  date: Date | string | number
} & ComponentProps<'span'>) {
  const language = useRouteContext({
    from: '__root__',
    select: ({ user }) => user?.language,
  })
  const [displayDate, setDisplayDate] = useState(
    new Date(date).toLocaleString(language || 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'UTC',
    }),
  )

  useEffect(() => {
    setDisplayDate(
      new Date(date).toLocaleString(language || getBrowserLocale(), {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    )
  }, [date, language])

  return <span {...props}>{displayDate}</span>
}
