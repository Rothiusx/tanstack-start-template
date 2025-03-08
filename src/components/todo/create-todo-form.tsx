'use client'

import type { TodoInsert } from '@/schemas/todo'
import { AngularIcon } from '@/components/icons/angular'
import { NextIcon } from '@/components/icons/next'
import { SolidIcon } from '@/components/icons/solid'
import { SvelteIcon } from '@/components/icons/svelte'
import { TanStack } from '@/components/icons/tanstack'
import { VueIcon } from '@/components/icons/vue'
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
import { todoInsertSchema } from '@/schemas/todo'
import { createTodo } from '@/server/functions/todo'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function CreateTodoForm() {
  const navigate = useNavigate()
  const form = useForm<TodoInsert>({
    resolver: zodResolver(todoInsertSchema),
    defaultValues: {
      title: '',
      description: '',
      project: undefined,
      language: 'en',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createTodo,
    onSuccess: ({ data, message }) => {
      form.reset(data)
      toast.success(message)
      navigate({ to: '/todo' })
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutate({ data }))}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter todo title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter todo description"
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
          name="project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    {
                      value: 'tanstack',
                      label: 'Tanstack',
                      icon: <TanStack className="size-4" />,
                    },
                    {
                      value: 'nextjs',
                      label: 'Next.js',
                      icon: <NextIcon className="size-4" />,
                    },
                    {
                      value: 'svelte',
                      label: 'Svelte',
                      icon: <SvelteIcon className="size-4" />,
                    },
                    {
                      value: 'solid',
                      label: 'Solid',
                      icon: <SolidIcon className="size-4" />,
                    },
                    {
                      value: 'angular',
                      label: 'Angular',
                      icon: <AngularIcon className="size-4" />,
                    },
                    {
                      value: 'vue',
                      label: 'Vue',
                      icon: <VueIcon className="size-4" />,
                    },
                  ].map(({ value, label, icon }) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className="flex flex-row items-center gap-2"
                    >
                      {icon}
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select one of the available projects.
              </FormDescription>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="cs">Czech</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending || !form.formState.isDirty}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </Form>
  )
}
