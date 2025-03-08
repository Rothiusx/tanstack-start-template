import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { session } = useRouteContext({ strict: false })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to <span className="text-primary">Our Platform</span>
        </h1>
        <p className="text-muted-foreground max-w-[700px] text-lg">
          A modern, feature-rich application built with Next.js and Shadcn UI
          components.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            {session ? (
              <Link to="/todo">Get Started</Link>
            ) : (
              <Link to="/login">Sign In</Link>
            )}
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Feature Rich</CardTitle>
              <CardDescription>
                Powerful components at your fingertips
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our platform provides a comprehensive set of tools and features
                to help you build amazing applications.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm">
                Explore Features
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modern Design</CardTitle>
              <CardDescription>
                Beautiful UI components with Shadcn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Leverage the power of Shadcn UI components to create stunning
                interfaces with minimal effort.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm">
                View Components
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secure Authentication</CardTitle>
              <CardDescription>Built-in auth with better-auth</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our platform includes robust authentication features to keep
                your users' data safe and secure.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm">
                Learn About Security
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
