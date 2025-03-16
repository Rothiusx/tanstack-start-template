import { BetterAuthIcon } from '@/components/icons/better-auth'
import { DrizzleIcon } from '@/components/icons/drizzle'
import { ShadcnIcon } from '@/components/icons/shadcn'
import { TanStackIcon } from '@/components/icons/tanstack'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FlipWords } from '@/components/ui/flip-words'
import { LinkPreview } from '@/components/ui/link-preview'
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
          <h1 className="text-3xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <FlipWords
              className="xl-[800px] w-[400px] text-center text-4xl font-semibold tracking-tight md:text-5xl lg:w-[600px] lg:text-5xl 2xl:w-[1000px]"
              words={[
                'Build faster with our platform',
                'Create better with our tools',
                'Design smarter with our system',
              ]}
            />
          </h1>
          <p className="text-muted-foreground mx-auto text-xl">
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

      <div className="mx-auto mt-16 w-full max-w-5xl">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-6 font-medium lg:gap-10 xl:gap-16">
            {[
              {
                url: 'https://tanstack.com/',
                icon: <TanStackIcon className="size-6 lg:size-8 xl:size-10" />,
                label: 'TanStack',
              },
              {
                url: 'https://ui.shadcn.com/',
                icon: <ShadcnIcon className="size-6 lg:size-8 xl:size-10" />,
                label: 'Shadcn UI',
              },
              {
                url: 'https://better-auth.com/',
                icon: (
                  <BetterAuthIcon className="size-6 lg:size-8 xl:size-10" />
                ),
                label: 'Better Auth',
              },
              {
                url: 'https://orm.drizzle.team/',
                icon: <DrizzleIcon className="size-6 lg:size-8 xl:size-10" />,
                label: 'Drizzle ORM',
              },
            ].map(({ url, icon, label }) => (
              <LinkPreview
                key={label}
                url={url}
                className="hover:text-primary flex items-center gap-2 transition-colors lg:gap-3"
              >
                {icon}
                <span className="lg:text-lg xl:text-xl">{label}</span>
              </LinkPreview>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
