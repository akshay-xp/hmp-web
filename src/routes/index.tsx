import { Button } from "@/components/ui/button"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <h3 className="text-3xl underline text-indigo-500">Hello!</h3>
      <Button variant="ghost">Submit</Button>
    </main>
  )
}
