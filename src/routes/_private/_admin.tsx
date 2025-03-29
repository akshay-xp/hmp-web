import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { jwtDecode } from "jwt-decode"

import { Role } from "@/modules/account/account.apis.ts"
import { useAuthStore } from "@/modules/auth/auth-store.ts"

export const Route = createFileRoute("/_private/_admin")({
  beforeLoad: async ({ location }) => {
    const accessToken = useAuthStore.getState().accessToken
    const payLoad = accessToken ? jwtDecode<{ role: Role }>(accessToken) : null
    if (!payLoad || payLoad.role !== Role.ADMIN) {
      throw redirect({
        to: "/signin",
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
