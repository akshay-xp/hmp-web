import { Separator } from "@/components/ui/separator"
import { researchFormSchema } from "@/lib/forms/research.form"
import { getCustomer, getReview } from "@/modules/reviews/query-functions"
import { AddReviewForm } from "@/modules/reviews/components/add-review-form"
import { CustomerReviews } from "@/modules/reviews/components/customer-reviews"
import { CustomerSection } from "@/modules/reviews/components/customer-section"
import { ResearchForm } from "@/modules/reviews/components/research-form"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_private/")({
  component: RouteComponent,
  validateSearch: researchFormSchema,
})

function RouteComponent() {
  const { email, phone } = Route.useSearch()
  const customerQuery = useQuery({
    queryKey: ["customer", { email, phone }],
    queryFn: () => getCustomer(email, phone),
    enabled: !!(email || phone),
  })
  const customerId: number | undefined = customerQuery?.data?.id
  const reviewQuery = useQuery({
    queryKey: ["review", { customerId }],
    queryFn: () => getReview(customerId),
    enabled: !!customerId,
  })

  return (
    <div className="grid gap-6 max-w-xl w-full mx-auto py-5">
      <ResearchForm />
      <Separator />
      <CustomerSection />
      {reviewQuery.isSuccess &&
        (reviewQuery.data ? null : <AddReviewForm customerId={customerId} />)}
      <CustomerReviews />
    </div>
  )
}
