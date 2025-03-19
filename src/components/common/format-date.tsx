import { formatDate } from '@/lib/utils'
import { useEffect, useState } from 'react'

// Component to handle date display with proper hydration
export function FormatDate({ date }: { date: Date | string | number }) {
  // For SSR, use a stable format with UTC timezone
  const formattedDate = formatDate(date)

  // For client, we'll update after hydration
  const [clientDate, setClientDate] = useState<string | null>(null)

  // After hydration is complete, we can update to client timezone if needed
  useEffect(() => {
    // Only run this code on the client after hydration
    const clientFormattedDate = new Intl.DateTimeFormat(navigator.language, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(date))

    setClientDate(clientFormattedDate)
  }, [date])

  // This ensures we always render exactly what the server rendered initially
  // Then switch to client-formatted date after hydration
  return <span suppressHydrationWarning>{clientDate ?? formattedDate}</span>
}
