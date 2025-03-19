import { getBrowserLocale } from '@/lib/utils'
import { useRouteContext } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

// Component to handle date display with SSR and hydration
export function FormatDate({ date }: { date: Date | string | number }) {
  const language = useRouteContext({
    from: '__root__',
    select: ({ user }) => user?.language,
  })
  const [displayDate, setDisplayDate] = useState<string>(
    new Date(date).toLocaleString(language, {
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

  return <span>{displayDate}</span>
}
