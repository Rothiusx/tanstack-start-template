import type { ClassValue } from 'clsx'
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
