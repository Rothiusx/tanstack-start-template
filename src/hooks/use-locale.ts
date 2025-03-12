import { getSessionOptions } from '@/server/auth'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useLocale() {
  const {
    data: { locale },
  } = useSuspenseQuery(getSessionOptions())
  return locale
}
