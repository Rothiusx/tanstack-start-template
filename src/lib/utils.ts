import type { ClassValue } from 'clsx'
import { getRouteApi } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sleep(ms: number = 1000, dev: boolean = true) {
  if (dev && import.meta.env.DEV) {
    return await new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export function getLocale() {
  const rootRoute = getRouteApi('__root__')
  const locale = rootRoute.useRouteContext({
    select: ({ locale }) => locale,
  })
  return locale
}

export function formatDate(date: Date | string | number) {
  const locale = getLocale() || 'en'
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}
