import type { TodoCreateForm as TodoCreateFormType } from '@/schemas/todo'
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
import { todoCreateFormSchema } from '@/schemas/todo'
import { createTodo } from '@/server/functions/todo'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { projects, TodoProjectLabel } from './todo-project-label'

export function TodoCreateForm() {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(todoCreateFormSchema),
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
        className="space-y-6"
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
              <FormDescription>Enter the title of the TODO.</FormDescription>
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
              <FormDescription>
                Enter the description of the TODO. Description is optional.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="project"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(
                      Object.keys(projects) as Array<keyof typeof projects>
                    ).map((project) => (
                      <SelectItem key={project} value={project}>
                        <TodoProjectLabel project={project} />
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
        </div>

        <Button
          type="submit"
          className="min-w-36"
          disabled={isPending || !form.formState.isDirty}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Create
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
