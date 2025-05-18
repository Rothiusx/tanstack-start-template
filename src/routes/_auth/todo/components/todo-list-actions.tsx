import type { getTodo } from '@/server/todo'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { FilePenLine, Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/use-user'
import { deleteTodo } from '@/server/todo'

export function TodoListActions({
  todo,
}: {
  todo: Awaited<ReturnType<typeof getTodo>>
}) {
  const queryClient = useQueryClient()
  const user = useUser()

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: ({ message }) => {
      toast.success(message)
      queryClient.invalidateQueries()
    },
  })

  const disabled = isPending || todo.userId !== user?.id

  return (
    <div className="flex w-full flex-row justify-end gap-2">
      {disabled ? (
        <Button variant="secondary" size="sm" disabled>
          <FilePenLine className="size-5" />
        </Button>
      ) : (
        <Button variant="secondary" size="sm" asChild>
          <Link to="/todo/$id" params={{ id: todo.id }}>
            <FilePenLine className="size-5" />
          </Link>
        </Button>
      )}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" disabled={disabled}>
            {isPending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Trash2 className="size-5" />
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete a TODO{' '}
              {todo.title} from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                mutate({ data: { id: todo.id, userId: todo.userId } })
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
