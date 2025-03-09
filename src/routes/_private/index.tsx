import { AddReviewForm } from "@/components/add-review-form"
import { ResearchForm } from "@/components/research-form"
import { Separator } from "@/components/ui/separator"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_private/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid gap-8 max-w-sm w-full mx-auto">
      <ResearchForm />
      <Separator />
      <AddReviewForm />
    </div>
  )
}
