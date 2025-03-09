import { AddReviewForm } from "@/components/add-review-form"
import { ResearchForm } from "@/components/research-form"
import { Separator } from "@/components/ui/separator"
import { getCustomer, useReviewStore } from "@/modules/reviews"
import { getReview, getReviews } from "@/modules/reviews/query-functions"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_private/")({
  component: RouteComponent,
})

function RouteComponent() {
  const email = useReviewStore((state) => state.customerEmail)
  const phone = useReviewStore((state) => state.customerPhone)
  const customerId = useReviewStore((state) => state.customerId)
  const { data } = useQuery({
    queryKey: ["customer", { email, phone }],
    queryFn: () => getCustomer(email, phone),
    enabled: !!(email || phone),
  })
  const { data: review } = useQuery({
    queryKey: ["review", { customerId }],
    queryFn: () => getReview(customerId),
    enabled: !!customerId,
  })
  const { data: reviews } = useQuery({
    queryKey: ["reviews", { customerId }],
    queryFn: () => getReviews(customerId),
    enabled: !!customerId,
  })

  console.log(reviews)

  return (
    <div className="grid gap-8 max-w-sm w-full mx-auto">
      <ResearchForm />
      <Separator />
      <AddReviewForm />
      <p>{data?.email}</p>
      <p>{review?.rating}</p>
    </div>
  )
}
