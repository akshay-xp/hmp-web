import { ResetPasswordForm } from "@/components/reset-password-form"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/reset-password")({
  component: RouteComponent,
})

function RouteComponent() {
  return <ResetPasswordForm />
}
