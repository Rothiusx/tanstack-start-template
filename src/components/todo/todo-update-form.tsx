import type { TodoWithUser } from '@/schemas/todo'
import { TodoProjectLabel } from '@/components/todo/todo-project-label'
import { Button } from '@/components/ui/button'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { todoUpdateFormSchema } from '@/schemas/todo'
import { getTodoOptions, updateTodo } from '@/server/todo'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { projects } from './todo-project-label'

export function TodoUpdateForm({ todo }: { todo: TodoWithUser }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate({ from: '/todo/$id' })

  const form = useForm({
    resolver: zodResolver(todoUpdateFormSchema),
    defaultValues: {
      id: todo.id,
      userId: todo.userId,
      title: todo.title,
      description: todo.description,
      project: todo.project,
      language: todo.language,
      completed: todo.completed,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: updateTodo,
    onSuccess: ({ message }) => {
      toast.success(message)
      navigate({
        search: { edit: false },
        replace: true,
      })
      queryClient.invalidateQueries()
    },
    onError: ({ result: { message } }) => {
      toast.error(message)
    },
  })

  return (
    <Form {...form}>
      <div>{todo.title}</div>
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="project"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || undefined}
                >
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

        <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-y-0 space-x-3 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Completed</FormLabel>
                <FormDescription>Mark this todo as completed</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="min-w-36"
          disabled={isPending || !form.formState.isDirty}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
