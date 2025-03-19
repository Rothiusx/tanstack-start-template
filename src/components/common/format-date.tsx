import { useLocale } from '@/hooks/use-locale'
import { useEffect, useState } from 'react'

// Component to handle date display with proper hydration
export function FormatDate({ date }: { date: Date | string | number }) {
  const [clientDate, setClientDate] = useState<string>(date.toString())
  const language = useLocale()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('clientFormattedDate', clientDate)
      setClientDate(date.toLocaleString(language))
    }
  }, [clientDate, date, language])

  return <span suppressHydrationWarning>{clientDate}</span>
}
