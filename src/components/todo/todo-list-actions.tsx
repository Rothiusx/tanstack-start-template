import type { TodoSelect } from '@/schemas/todo'
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
import { deleteTodo } from '@/server/functions/todo'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { FilePenLine, Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export function TodoListActions({ id }: { id: TodoSelect['id'] }) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: ({ message }) => {
      toast.success(message)
      queryClient.invalidateQueries()
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })

  return (
    <div className="flex w-full flex-row justify-end gap-2">
      {isPending ? (
        <Button variant="secondary" size="sm" disabled>
          <FilePenLine className="size-5" />
        </Button>
      ) : (
        <Button variant="secondary" size="sm" asChild>
          <Link to="/todo/$id" params={{ id }}>
            <FilePenLine className="size-5" />
          </Link>
        </Button>
      )}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" disabled={isPending}>
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
              This action cannot be undone. This will permanently delete a user
              from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => mutate({ data: { id } })}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
