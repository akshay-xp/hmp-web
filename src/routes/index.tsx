import { privateApi } from "@/api/axios"
import { useAuthStore } from "@/auth"
import { Button } from "@/components/ui/button"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
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
  component: RouteComponent,
})

function RouteComponent() {
  const handleClick = async () => {
    const response = await privateApi.get("/")
    console.log(response.data)
  }

  const handleSignOut = async () => {
    useAuthStore.getState().signout()
  }

  return (
    <main>
      <h3 className="text-3xl underline text-indigo-500">Hello!</h3>
      <Button variant="ghost" onClick={handleClick}>
        Submit
      </Button>
      <Button variant="default" onClick={handleSignOut}>
        Sign out
      </Button>
    </main>
  )
}
