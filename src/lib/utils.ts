import type { ClassValue } from 'clsx'
import { getRouteApi } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sleep(ms: number = 100, enabled: boolean = true) {
  if (enabled && import.meta.env.DEV) {
    await new Promise((resolve) => setTimeout(resolve, ms))
  }
}

/**
 * Get the browser's locale with fallback to 'en-US'
 * @returns The browser's locale string (e.g. 'en-US', 'cs-CZ')
 */
export function getBrowserLocale() {
  if (typeof window !== 'undefined') {
    return navigator.languages?.[0] ?? navigator.language ?? 'en-US'
  }
  return 'en-US'
}

/**
 * Get the locale from the root route context or the browser's locale as fallback
 * @returns The locale string (e.g. 'en-US', 'cs-CZ')
 */
export function getLocale() {
  const rootRoute = getRouteApi('__root__')
  const language = rootRoute.useRouteContext({
    select: ({ user }) => user?.language,
  })

  return language ?? getBrowserLocale()
}

/**
 * Format a date to a string based on the locale - always uses UTC
 * @param date - The date to format
 * @returns The formatted date string
 */
export function formatDate(
  date: Date | string | number,
  timeZone: string = 'UTC',
) {
  const locale = getLocale()

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone,
  }).format(new Date(date))
}
