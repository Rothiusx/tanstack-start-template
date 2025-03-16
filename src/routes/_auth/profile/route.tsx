import { LoadingScreen } from '@/components/layout/loading-screen'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useUser } from '@/hooks/use-user'
import { EditProfileForm } from '@/routes/_auth/profile/components/update-profile-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/profile')({
  head: () => ({
    meta: [
      {
        title: 'Profile',
      },
    ],
  }),
  component: Profile,
})

function Profile() {
  const user = useUser()

  if (!user) {
    return <LoadingScreen />
  }

  return (
    <div className="container mx-auto">
      <div className="relative mb-8 flex flex-col items-center">
        <Avatar className="border-background size-32 border-4 text-3xl shadow-xl">
          <AvatarImage src={user.image ?? undefined} alt={user.name} />
          <AvatarFallback className="from-primary to-secondary bg-gradient-to-br text-white uppercase">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">{user.name}</h1>
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mt-2.5 px-2.5 py-1 uppercase transition-colors select-none">
          {user.role}
        </Badge>
      </div>

      <div className="relative mx-auto max-w-xl">
        <div className="from-primary/20 via-secondary/20 to-primary/20 absolute -inset-1 rounded-xl bg-gradient-to-r opacity-70 blur-xl"></div>
        <Card className="relative border shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-bold">
              Edit Profile
            </CardTitle>
            <CardDescription className="text-base">
              Update your personal information and account settings
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 backdrop-blur-sm">
            <EditProfileForm user={user} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
