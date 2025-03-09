import type { User } from '@/auth'
import { Button } from '@/components/ui/button'
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
import { updateUserSchema } from '@/schemas/profile'
import { getSessionOptions, updateUser } from '@/server/functions/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { StatusMessageProps } from '../ui/status-message'
import { StatusMessage } from '../ui/status-message'

export function EditProfileForm({ user }: { user: User }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [message, setMessage] = useState<StatusMessageProps>({
    message: '',
  })

  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      age: user.age ?? null,
      city: user.city ?? null,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: ({ data, message }) => {
      form.reset(data)
      router.invalidate()
      queryClient.invalidateQueries(getSessionOptions())
      setMessage({
        message,
      })
      toast.success(message)
    },
    onError: ({ message }) => {
      setMessage({
        message,
        variant: 'error',
      })
      toast.error(message)
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutate({ data }))}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
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
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="18"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input
                  placeholder="Třinec"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <StatusMessage {...message} />

        <Button
          type="submit"
          className="float-right min-w-36"
          disabled={!form.formState.isDirty || isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            'Save'
          )}
        </Button>
      </form>
    </Form>
  )
}
