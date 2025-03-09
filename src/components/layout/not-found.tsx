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
import { Link, type NotFoundRouteProps } from '@tanstack/react-router'
import { FileQuestion, Home, Search } from 'lucide-react'

export function NotFound({ data }: NotFoundRouteProps) {
  // Check if data exists and is not null/undefined
  const hasData = data !== null && data !== undefined

  return (
    <div className="mt-24 flex w-full items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <FileQuestion className="text-primary h-6 w-6" />
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
          <div className="flex flex-col items-center justify-center space-y-4 py-6">
            <Search className="text-muted-foreground h-16 w-16 opacity-50" />
            <p className="text-muted-foreground text-center">
              The page you requested either doesn't exist or you don't have
              access to it.
            </p>
            {hasData && (
              <div className="mt-4 w-full">
                <p className="mb-2 text-sm font-medium">
                  Additional Information:
                </p>
                <div className="bg-muted max-h-40 overflow-auto rounded-md p-3">
                  <pre className="font-mono text-xs break-words whitespace-pre-wrap">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>
              </div>
            )}
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
