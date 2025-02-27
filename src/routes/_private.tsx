import { useAuthStore } from "@/auth"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_private")({
  beforeLoad: async ({ location }) => {
    if (!useAuthStore.getState().accessToken) {
      const newAccessToken =
        !useAuthStore.getState().isRefreshRetry &&
        (await useAuthStore.getState().refreshToken())
      if (!newAccessToken) {
        throw redirect({
          to: "/signin",
          search: {
            redirect: location.href,
          },
        })
      }
    }
  },
  component: LayoutComponent,
})

function LayoutComponent() {
  return <Outlet />
}
