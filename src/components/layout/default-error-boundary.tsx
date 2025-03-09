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
            <AlertTriangle className="text-destructive h-6 w-6" />
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
            <div className="bg-muted rounded-md p-4">
              <p className="font-mono text-sm break-words">
                {error.message || 'Unknown error'}
              </p>
            </div>

            {info?.componentStack && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Terminal className="text-muted-foreground h-4 w-4" />
                  <p className="text-sm font-medium">Stack trace</p>
                </div>
                <div className="bg-muted max-h-60 overflow-auto rounded-md p-4">
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
            onClick={() => (window.location.href = '/')}
          >
            Go Home
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
