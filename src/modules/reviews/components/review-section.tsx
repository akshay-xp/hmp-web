import { useMutation, useQuery } from "@tanstack/react-query"
import {
  ChevronDown,
  ChevronUp,
  EllipsisVertical,
  Pencil,
  Trash,
} from "lucide-react"
import { useState } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx"
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
import { queryClient } from "@/modules/query/query-client.ts"
import { Route } from "@/routes/_private/index.tsx"

import {
  deleteReview,
  getCustomer,
  getReview,
  getReviewTags,
} from "../query-functions.ts"

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
  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getReviewTags(),
  })
  const { data, isSuccess } = useQuery({
    queryKey: ["review", { customerId }],
    queryFn: () => getReview(customerId),
    enabled: !!customerId,
  })
  const mutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: (data) => {
      queryClient.setQueryData(["review", { customerId }], data)
    },
  })

  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const handleEditReview = () => {
    setIsEdit(!isEdit)
  }

  const handleDeleteReview = () => {
    setOpen(!open)
  }

  if (isEdit) {
    return (
      <AddReviewForm
        customerId={customerId}
        data={data}
        isEdit={isEdit}
        onEdit={() => setIsEdit(!isEdit)}
      />
    )
  }

  if (isSuccess) {
    return data ? (
      <>
        <Card className="relative">
          <CardHeader>
            <CardDescription>
              See how you've rated this customer based on past interactions.
            </CardDescription>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3"
                >
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onSelect={handleEditReview}
                  className="flex justify-between"
                >
                  Edit <Pencil />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={handleDeleteReview}
                  className="flex justify-between"
                >
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
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
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
          </CardFooter>
        </Card>
        <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                review.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => mutation.mutate(customerId!)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    ) : (
      <AddReviewForm customerId={customerId} />
    )
  }
}
