import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { format } from "date-fns"
import { ArrowUpDown, ChevronDown, ChevronUp, Filter, Flag } from "lucide-react"

import { Badge } from "@/components/ui/badge.tsx"
import { Button } from "@/components/ui/button.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx"
import { Route } from "@/routes/_private/index.tsx"

import { getCustomer, getReviews, getReviewTags } from "../query-functions.ts"

import { CustomerRatingChart } from "./customer-rating-chart.tsx"
import { RatingStars } from "./rating-stars.tsx"

export function CustomerReviews() {
  const { email, phone, rating, sortBy } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const customerQuery = useQuery({
    queryKey: ["customer", { email, phone }],
    queryFn: () => getCustomer(email, phone),
    enabled: !!(email || phone),
  })
  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getReviewTags(),
  })
  const customerId = customerQuery.data?.id

  const { data, isSuccess, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["reviews", { customerId, rating, sortBy }],
    queryFn: ({ pageParam }) =>
      getReviews(pageParam, customerId, rating, sortBy),
    initialPageParam: {
      cursorA: -1,
      cursorB: -1,
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore
        ? {
            cursorA: lastPage.cursorA,
            cursorB: lastPage.cursorB,
          }
        : undefined
    },
    enabled: !!customerId,
  })

  if (customerId && isSuccess) {
    return (
      <>
        <CustomerRatingChart customerId={customerId} />
        <div className="flex justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                {"Filter"}
                <Filter />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() =>
                  navigate({ search: (prev) => ({ ...prev, rating: 1 }) })
                }
              >
                1 ★
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate({ search: (prev) => ({ ...prev, rating: 2 }) })
                }
              >
                2 ★
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate({ search: (prev) => ({ ...prev, rating: 3 }) })
                }
              >
                3 ★
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate({ search: (prev) => ({ ...prev, rating: 4 }) })
                }
              >
                4 ★
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate({ search: (prev) => ({ ...prev, rating: 5 }) })
                }
              >
                5 ★
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                {"Sort By"}
                <ArrowUpDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    search: (prev) => ({ ...prev, sortBy: "createdAt" }),
                  })
                }
              >
                Recently Created
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate({
                    search: (prev) => ({ ...prev, sortBy: "updatedAt" }),
                  })
                }
              >
                Recently Updated
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {data.pages.map((page) => (
          <>
            {page.reviews.map((review) => (
              <div key={review.businessId}>
                <div className="flex flex-col items-start gap-4">
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                      <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <RatingStars rating={review.rating} />
                          <span className="mx-2">•</span>
                          <time dateTime={review.updatedAt}>
                            {format(new Date(review.updatedAt), "yyyy-MM-dd")}
                          </time>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-5"
                            >
                              <Flag className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Report</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    {review.comment && (
                      <p className="mt-2 text-sm">{review.comment}</p>
                    )}
                  </div>
                  {review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {review.tags.map((tag) => (
                        <Badge variant="outline">
                          {tags?.get(tag.tagId)?.type === "POSITIVE" ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                          &nbsp;
                          {tags?.get(tag.tagId)?.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <Separator className="mt-6" />
              </div>
            ))}
          </>
        ))}
        <span className="flex justify-center">
          {hasNextPage && (
            <Button variant="outline" onClick={() => fetchNextPage()}>
              Load More
            </Button>
          )}
        </span>
      </>
    )
  }
}
