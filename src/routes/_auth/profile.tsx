import { LoadingScreen } from '@/components/layout/loading-screen'
import { EditProfileForm } from '@/components/profile/update-profile-form'
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
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/profile')({
  component: Profile,
})

function Profile() {
  const user = useUser()

  if (!user) {
    return <LoadingScreen />
  }

  return (
    <section className="flex flex-col items-center justify-center gap-8 px-4 py-8">
      <Avatar className="size-24 text-2xl lg:size-48 lg:text-6xl">
        <AvatarImage src={user.image ?? undefined} alt={user.name} />
        <AvatarFallback className="uppercase">
          {user.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-4xl font-medium">Welcome, {user.name}!</h1>
      <Card className="w-1/3 max-w-[600px] min-w-[350px]">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Permissions</span>
            <Badge className="uppercase">{user.role}</Badge>
          </div>
          <EditProfileForm user={user} />
        </CardContent>
      </Card>
    </section>
  )
}
