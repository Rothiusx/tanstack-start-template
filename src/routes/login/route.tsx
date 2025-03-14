import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createFileRoute, redirect } from '@tanstack/react-router'
import SignIn from './components/sign-in'
import { SignUp } from './components/sign-up'

export const Route = createFileRoute('/login')({
  component: Login,
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: '/' })
    }
  },
})

function Login() {
  return (
    <section className="mx-auto mt-[8vh]">
      <Tabs defaultValue="sign-in" className="w-[400px]">
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
