import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { EmailLink } from "@/components/ui/email-link.tsx"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx"
import { getUser } from "@/modules/account/account.apis.ts"
import { ChangePasswordForm } from "@/modules/account/components/change-password-form.tsx"
import { EditAccountForm } from "@/modules/account/components/edit-account-form.tsx"

export const Route = createFileRoute("/_private/account")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  })

  return (
    isSuccess && (
      <div className="flex flex-col gap-6 p-5 w-full max-w-xl mx-auto">
        <div className="relative">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {data.name || "Anonymous"}
          </h2>
          <span className="text-sm text-muted-foreground">
            <EmailLink email={data.email} />
          </span>
        </div>
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <EditAccountForm email={data.email} name={data.name} />
          </TabsContent>
          <TabsContent value="password">
            <ChangePasswordForm />
          </TabsContent>
        </Tabs>
      </div>
    )
  )
}
