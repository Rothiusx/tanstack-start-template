import { useEffect, useState } from 'react'
import { getBrowserLocale } from '@/lib/utils'
import { useRootContextUser } from './use-user'

/**
 * Hook to get the client's locale from the user's language preference or the browser's locale as fallback
 * @returns The client's locale string (e.g. 'en-US', 'cs-CZ')
 */
export function useLocale() {
  const user = useRootContextUser()
  const [locale, setLocale] = useState('')

  useEffect(() => {
    setLocale(user?.language ?? getBrowserLocale())
  }, [user?.language])

  return locale
}
