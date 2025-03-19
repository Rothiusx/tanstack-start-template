import { formatDate } from '@/lib/utils'

// Component to handle date display with suppressed hydration warnings
export function FormatDate({ date }: { date: Date | string | number }) {
  return <span suppressHydrationWarning>{formatDate(date)}</span>
}
