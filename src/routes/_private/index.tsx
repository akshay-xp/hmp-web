import { privateApi } from "@/api/axios"
import { useAuthStore } from "@/auth"
import { Button } from "@/components/ui/button"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/_private/")({
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
      <Link to="/dashboard">Dashboard</Link>
      <Button variant="ghost" onClick={handleClick}>
        Submit
      </Button>
      <Button variant="default" onClick={handleSignOut}>
        Sign out
      </Button>
    </main>
  )
}
