import { useMutation, useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { format } from "date-fns"

import { Button } from "@/components/ui/button.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { queryClient } from "@/modules/query/query-client.ts"
import { RatingStars } from "@/modules/reviews/components/rating-stars.tsx"
import {
  deleteReport,
  deleteReview,
  getReports,
} from "@/modules/reviews/query-functions.ts"

export const Route = createFileRoute("/_private/_admin/moderation")({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isSuccess } = useQuery({
    queryKey: ["reports"],
    queryFn: () => getReports(),
  })

  const mutate = useMutation({
    mutationFn: deleteReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] })
    },
  })

  const mutateReview = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] })
    },
  })

  return (
    isSuccess && (
      <div className="flex flex-col gap-6 p-5 w-full max-w-xl mx-auto">
        {data.map((report) => (
          <div key={report.review.businessId}>
            <p>
              <span className="text-sm">Reviewed by</span>&nbsp;
              <span className="font-semibold capitalize">
                {report.review.business.name}
              </span>
            </p>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <RatingStars rating={report.review.rating} />
              <span className="mx-2">•</span>
              <time dateTime={report.review.updatedAt}>
                {format(new Date(report.review.updatedAt), "LLL dd, yyyy")}
              </time>
            </p>
            <p className="mt-2 text-sm">{report.review.comment}</p>
            <p className="mt-2 text-sm">
              <span className="text-muted-foreground">
                Reason for reporting:{" "}
              </span>
              {report.reason}
            </p>
            <div className="flex gap-4 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => mutate.mutateAsync(report.id)}
              >
                Keep
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => mutateReview.mutateAsync(report.review.id)}
              >
                Remove
              </Button>
            </div>
            <Separator className="mt-4" />
          </div>
        ))}
      </div>
    )
  )
}
