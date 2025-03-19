import { formatDate, getBrowserLocale } from '@/lib/utils'
import { useRouteContext } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

// Component to handle date display with proper hydration
export function FormatDate({ date }: { date: Date | string | number }) {
  const language = useRouteContext({
    from: '__root__',
    select: ({ user }) => user?.language,
  })
  const [clientDate, setClientDate] = useState<string>(
    date.toLocaleString(language),
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('clientFormattedDate', clientDate)
      setClientDate(date.toLocaleString(language ?? getBrowserLocale()))
    }
  }, [clientDate, date, language])

  return <span suppressHydrationWarning>{clientDate}</span>
}
