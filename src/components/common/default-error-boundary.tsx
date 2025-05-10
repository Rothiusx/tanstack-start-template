import type { ErrorComponentProps } from '@tanstack/react-router'
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
import { Link } from '@tanstack/react-router'
import { AlertTriangle, RefreshCcw, Terminal } from 'lucide-react'

export function DefaultErrorBoundary({
  error,
  info,
  reset,
}: ErrorComponentProps) {
  return (
    <div className="mt-24 flex w-full items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <CardTitle className="text-xl font-semibold">
              Something went wrong
            </CardTitle>
          </div>
          <CardDescription>
            An unexpected error has occurred. We've been notified and are
            working on a fix.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <p className="font-mono text-sm break-words">
                {error.message || 'Unknown error'}
              </p>
            </div>

            {info?.componentStack != null && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Stack trace</p>
                </div>
                <div className="max-h-60 overflow-auto rounded-md bg-muted p-4">
                  <pre className="font-mono text-xs break-words whitespace-pre-wrap">
                    {info.componentStack}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            asChild
            onClick={() => (window.location.href = '/')}
          >
            <Link to="/">Go Home</Link>
          </Button>
          <Button onClick={reset} className="gap-1">
            <RefreshCcw className="mr-1 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
