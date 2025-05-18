import type { LinkOptions } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { isAuthClientError, signUp } from '@/lib/auth/client'
import { getUserOptions } from '@/server/auth'
import { signUpSchema } from '@/validation/auth'

/**
 * The callback URL for the sign up
 */
const CALLBACK_URL: LinkOptions['to'] = '/todo'

export function SignUp() {
  const queryClient = useQueryClient()
  const navigate = useNavigate({ from: '/login' })

  const [imagePreview, setImagePreview] = useState('')
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      image: undefined,
    },
  })

  const watch = useWatch({ control: form.control })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                async ({ email, password, firstName, lastName, image }) => {
                  await signUp.email({
                    email,
                    password,
                    name: `${firstName} ${lastName}`,
                    image: image ? await convertImageToBase64(image) : '',
                    callbackURL: CALLBACK_URL,
                    fetchOptions: {
                      onSuccess: async () => {
                        toast.success('Account created successfully')
                        await queryClient.invalidateQueries(getUserOptions())
                        navigate({ to: '/todo' })
                      },
                      onError: ({ error }) => {
                        console.log(error)
                        if (
                          isAuthClientError(error.code, 'USER_ALREADY_EXISTS')
                        ) {
                          form.setError('email', {
                            message: error.message,
                          })
                        }
                        toast.error(error.message)
                      },
                    },
                  })
                },
              )}
              className="space-y-8"
            >
              <div className="flex justify-between gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Profile Image (optional)</FormLabel>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-14">
                        <AvatarImage src={imagePreview} />
                        <AvatarFallback className="uppercase">
                          {watch.firstName?.charAt(0) || 'JD'}
                          {watch.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          {...fieldProps}
                          onChange={(event) => {
                            const file = event.target.files?.[0]
                            if (file) {
                              setImagePreview(URL.createObjectURL(file))
                              onChange(file)
                            }
                          }}
                          className="transition-colors hover:bg-muted/50"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="size-6 animate-spin" />
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Convert the image to a base64 string
 */
function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result as string)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
