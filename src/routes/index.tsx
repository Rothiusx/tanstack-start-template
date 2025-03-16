import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useUser } from '@/hooks/use-user'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Layout, Shield, Zap } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const user = useUser()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center space-y-10 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Build{' '}
            <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
              faster
            </span>{' '}
            with our platform
          </h1>
          <p className="text-muted-foreground mx-auto max-w-[700px] text-xl">
            A modern, feature-rich application built with React and beautiful UI
            components.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {user ? (
            <Button size="lg" className="group min-w-40 gap-2" asChild>
              <Link to="/todo">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          ) : (
            <Button size="lg" className="group min-w-40 gap-2" asChild>
              <Link to="/login">
                Sign In
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
          <Button size="lg" variant="outline" className="min-w-40">
            Learn More
          </Button>
        </div>

        <div className="relative w-full max-w-5xl py-10">
          <div className="from-primary/20 to-secondary/20 absolute -inset-0.5 rounded-xl bg-gradient-to-r blur-xl"></div>
          <div className="relative rounded-lg bg-black/5 p-4 backdrop-blur-sm dark:bg-white/5">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="bg-background/80 border-0 shadow-lg transition-all hover:shadow-xl">
                <CardHeader>
                  <Zap className="text-primary h-8 w-8" />
                  <CardTitle className="text-xl">Feature Rich</CardTitle>
                  <CardDescription>
                    Powerful components at your fingertips
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our platform provides a comprehensive set of tools and
                    features to help you build amazing applications.
                  </p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="ghost" size="sm" className="group gap-2">
                    Explore Features
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-background/80 border-0 shadow-lg transition-all hover:shadow-xl">
                <CardHeader>
                  <Layout className="text-primary h-8 w-8" />
                  <CardTitle className="text-xl">Modern Design</CardTitle>
                  <CardDescription>
                    Beautiful UI components with Shadcn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Leverage the power of Shadcn UI components to create
                    stunning interfaces with minimal effort.
                  </p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="ghost" size="sm" className="group gap-2">
                    View Components
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-background/80 border-0 shadow-lg transition-all hover:shadow-xl">
                <CardHeader>
                  <Shield className="text-primary h-8 w-8" />
                  <CardTitle className="text-xl">
                    Secure Authentication
                  </CardTitle>
                  <CardDescription>
                    Built-in auth with better-auth
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our platform includes robust authentication features to keep
                    your users' data safe and secure.
                  </p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button variant="ghost" size="sm" className="group gap-2">
                    Learn About Security
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
