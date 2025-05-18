import type { NotFoundRouteProps } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { FileQuestion, Home, Search } from 'lucide-react'
import { useLayoutEffect, useState } from 'react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const notFoundSchema = z.object({
  data: z.object({
    message: z.string().min(1),
  }),
})

export function NotFound({
  data,
  children,
}: NotFoundRouteProps & { children?: React.ReactNode }) {
  const [message, setMessage] = useState('')

  useLayoutEffect(() => {
    const result = notFoundSchema.safeParse(data)
    if (result.success) {
      setMessage(result.data.data.message)
    }
  }, [data])

  return (
    <div className="mt-24 flex w-full items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <FileQuestion className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl font-semibold">
              Page Not Found
            </CardTitle>
          </div>
          <CardDescription>
            We couldn't find the page you were looking for.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
            <Search className="h-16 w-16 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">
              The page you requested either doesn't exist or you don't have
              access to it.
            </p>
            {message && (
              <p className="text-lg font-semibold text-muted-foreground">
                {message}
              </p>
            )}
            {children}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to="/" className="gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
