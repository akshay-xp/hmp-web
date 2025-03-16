import { useQuery } from "@tanstack/react-query"
import {
  ChevronDown,
  ChevronUp,
  EllipsisVertical,
  Pencil,
  Trash,
} from "lucide-react"

import { Badge } from "@/components/ui/badge.tsx"
import { Button } from "@/components/ui/button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import { Route } from "@/routes/_private/index.tsx"

import { getCustomer, getReview } from "../query-functions.ts"

import { AddReviewForm } from "./add-review-form.tsx"
import { RatingStars } from "./rating-stars.tsx"

export function ReviewSection() {
  const { email, phone } = Route.useSearch()
  const customerQuery = useQuery({
    queryKey: ["customer", { email, phone }],
    queryFn: () => getCustomer(email, phone),
    enabled: !!(email || phone),
  })
  const customerId = customerQuery.data?.id
  const { data, isSuccess } = useQuery({
    queryKey: ["review", { customerId }],
    queryFn: () => getReview(customerId),
    enabled: !!customerId,
  })

  if (isSuccess) {
    return data ? (
      <Card>
        <CardHeader className="relative">
          <CardDescription>
            See how you've rated this customer based on past interactions.
          </CardDescription>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-6"
              >
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="flex justify-between">
                Edit <Pencil />
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between">
                Delete <Trash />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <RatingStars rating={data.rating} className="text-2xl" />
          <p className="text-sm">{data.comment}</p>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2">
            <Badge variant="outline">
              <ChevronUp /> Regular Customer
            </Badge>
            <Badge variant="outline">
              <ChevronUp />
              Polite
            </Badge>
            <Badge variant="secondary">
              <ChevronDown />
              Late Check-ins
            </Badge>
          </div>
        </CardFooter>
      </Card>
    ) : (
      <AddReviewForm customerId={customerId} />
    )
  }
}
