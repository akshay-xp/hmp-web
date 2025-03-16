import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"

import { Separator } from "@/components/ui/separator.tsx"
import { Route } from "@/routes/_private/index.tsx"

import { getCustomer, getReviews } from "../query-functions.ts"

import { CustomerRatingChart } from "./customer-rating-chart.tsx"
import { RatingStars } from "./rating-stars.tsx"

export function CustomerReviews() {
  const { email, phone } = Route.useSearch()
  const customerQuery = useQuery({
    queryKey: ["customer", { email, phone }],
    queryFn: () => getCustomer(email, phone),
    enabled: !!(email || phone),
  })
  const customerId = customerQuery.data?.id
  const reviews = useQuery({
    queryKey: ["reviews", { customerId }],
    queryFn: () => getReviews(customerId),
    enabled: !!customerId,
  })

  if (reviews.isSuccess) {
    return (
      <>
        <CustomerRatingChart />
        {reviews.data.reviews.map((review) => (
          <div key={review.businessId} className="pb-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <RatingStars rating={review.rating} />
                    <span className="mx-2">•</span>
                    <time dateTime={review.updatedAt}>
                      {format(new Date(review.updatedAt), "yyyy-MM-dd")}
                    </time>
                  </div>
                </div>
                <p className="mt-2 text-sm">{review.comment}</p>
              </div>
            </div>
            <Separator className="mt-6" />
          </div>
        ))}
      </>
    )
  }
}
