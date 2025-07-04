import type { StatusMessageProps } from '@/components/ui/status-message'
import type { User } from '@/lib/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StatusMessage } from '@/components/ui/status-message'
import { getUserOptions, updateUser } from '@/server/auth'
import { userUpdateSchema } from '@/validation/auth'

export function UpdateProfileForm({ user }: { user: User }) {
  const queryClient = useQueryClient()
  const [message, setMessage] = useState<StatusMessageProps>({
    message: '',
  })

  const form = useForm({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      age: user.age ?? null,
      city: user.city ?? null,
      language: user.language ?? null,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: async ({ data, message }) => {
      form.reset(data)
      await queryClient.invalidateQueries(getUserOptions())
      setMessage({
        message,
      })
      toast.success(message)
    },
    onError: ({ result }) => {
      setMessage({
        message: result?.message ?? 'Something went wrong',
        variant: 'error',
      })
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
                  onChange={(e) => {
                    const value = e.target.value
                    if (value === '') {
                      field.onChange(null)
                    } else {
                      field.onChange(Number(value))
                    }
                  }}
                  value={String(field.value ?? '')}
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
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select
                value={field.value ?? ''}
                onValueChange={(value) =>
                  value === 'none'
                    ? field.onChange(null)
                    : field.onChange(value)
                }
                defaultValue={field.value ?? undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {form.getValues().language && (
                    <SelectItem value="none" className="text-muted-foreground">
                      Select a language
                    </SelectItem>
                  )}
                  <SelectItem value="cs">Czech</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the language of the todo.
              </FormDescription>
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
