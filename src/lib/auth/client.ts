import type { auth } from '@/lib/auth'
import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BASE_URL,
  plugins: [inferAdditionalFields<typeof auth>(), adminClient()],
})

export const { signIn, signOut, signUp } = authClient

/**
 * Helper function to check if an error code matches a specific error code string
 */
export function isAuthClientError(
  code: unknown,
  expectedCode: keyof typeof authClient.$ERROR_CODES,
): boolean {
  return typeof code === 'string' && code === expectedCode
}
