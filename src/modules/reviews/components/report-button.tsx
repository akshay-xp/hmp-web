import { useMutation } from "@tanstack/react-query"
import { Flag } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button.tsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx"

import { reportReview } from "../query-functions.ts"
import {
  ReportReviewFormData,
  reportReviewFormResolver,
} from "../schema/report-review.schema.ts"

type Props = {
  reviewId: number
}

export function ReportButton({ reviewId }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const mutation = useMutation({
    mutationFn: reportReview,
    onSuccess: () => {
      toggleDialog()
    },
  })

  const form = useForm<ReportReviewFormData>({
    resolver: reportReviewFormResolver,
    defaultValues: {
      reason: undefined,
    },
  })

  async function onSubmit(values: ReportReviewFormData) {
    const payload = {
      ...values,
      reviewId,
    }
    mutation.mutateAsync(payload)
  }

  return (
    <Tooltip>
      <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
        <DialogTrigger asChild>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="size-5">
              <Flag className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit a Report</DialogTitle>
            <DialogDescription>
              Tell us why this review should be flagged. We’ll take appropriate
              action.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reason</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit">Report</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <TooltipContent>
        <p>Report</p>
      </TooltipContent>
    </Tooltip>
  )
}
