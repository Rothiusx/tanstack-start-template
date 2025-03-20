import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import SignIn from './components/sign-in'
import { SignUp } from './components/sign-up'

const loginSearchSchema = z.object({
  tab: z.enum(['sign-in', 'sign-up']).default('sign-in'),
})

export const Route = createFileRoute('/login')({
  validateSearch: loginSearchSchema,
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: '/' })
    }
  },
  onError: () => {
    throw redirect({ to: '/login' })
  },
  head: () => ({
    meta: [{ title: 'Sign In' }],
  }),
  component: Login,
})

function Login() {
  const { tab } = Route.useSearch()
  const navigate = Route.useNavigate()

  return (
    <section className="container mx-auto mt-[8vh] max-w-md">
      <Tabs
        defaultValue={tab}
        onValueChange={(value) =>
          navigate({
            search: { tab: value as z.infer<typeof loginSearchSchema>['tab'] },
          })
        }
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignIn />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignUp />
        </TabsContent>
      </Tabs>
    </section>
  )
}
