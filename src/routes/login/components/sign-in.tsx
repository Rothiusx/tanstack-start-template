import type { LinkOptions } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { DiscordIcon } from '@/components/icons/discord'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { signIn } from '@/lib/auth/client'
import { cn } from '@/lib/utils'
import { getUserOptions } from '@/server/auth'
import { signInSchema } from '@/validation/auth'

/**
 * The callback URL for the sign in
 */
const CALLBACK_URL: LinkOptions['to'] = '/'

export default function SignIn({
  flowStarted,
  setFlowStarted,
}: {
  flowStarted: boolean
  setFlowStarted: (value: boolean) => void
}) {
  const queryClient = useQueryClient()

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your credentials below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async ({ email, password }) => {
                await signIn.email({
                  email,
                  password,
                  callbackURL: CALLBACK_URL,
                  fetchOptions: {
                    onError: ({ error }) => {
                      toast.error(error.message)
                    },
                    onSuccess: async () => {
                      toast.success('Login successful')
                      await queryClient.invalidateQueries(getUserOptions())
                    },
                  },
                })
              })}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your name as it will appear on the website
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel htmlFor="rememberMe">Remember me</FormLabel>
                    <Link
                      to="/"
                      className="ml-auto inline-block text-sm underline aria-disabled:opacity-50"
                      disabled={flowStarted}
                    >
                      Forgot your password?
                    </Link>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting || flowStarted}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="size-6 animate-spin" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Form>
          <Button
            variant="outline"
            className={cn('w-full gap-2')}
            disabled={flowStarted}
            onClick={async () => {
              setFlowStarted(true)
              await signIn.social({
                provider: 'discord',
                callbackURL: CALLBACK_URL,
                fetchOptions: {
                  onError: ({ error }) => {
                    setFlowStarted(false)
                    toast.error(error.message)
                  },
                },
              })
            }}
          >
            {flowStarted ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <DiscordIcon className="size-4" />
                Sign in with Discord
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
