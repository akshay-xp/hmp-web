import { createFileRoute } from "@tanstack/react-router"

import { Separator } from "@/components/ui/separator.tsx"
import { researchFormSchema } from "@/lib/forms/research.form"
import { CustomerReviews } from "@/modules/reviews/components/customer-reviews.tsx"
import { CustomerSection } from "@/modules/reviews/components/customer-section.tsx"
import { ResearchForm } from "@/modules/reviews/components/research-form.tsx"
import { ReviewSection } from "@/modules/reviews/components/review-section.tsx"

export const Route = createFileRoute("/_private/")({
  component: RouteComponent,
  validateSearch: researchFormSchema,
})

function RouteComponent() {
  return (
    <div className="grid gap-6 max-w-xl w-full mx-auto py-5">
      <ResearchForm />
      <Separator />
      <CustomerSection />
      <ReviewSection />
      <CustomerReviews />
    </div>
  )
}
