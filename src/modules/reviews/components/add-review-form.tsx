import { useMutation } from "@tanstack/react-query"
import { Plus, StarIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import {
  AddReviewFormData,
  addReviewFormResolver,
} from "@/lib/forms/add-review.form"
import { cn } from "@/lib/utils.ts"
import { queryClient } from "@/modules/query/query-client.ts"

import { addReview } from "../query-functions.ts"

export function AddReviewForm({ customerId }: { customerId?: number }) {
  const [showForm, setShowForm] = useState<boolean>(false)
  const mutation = useMutation({
    mutationFn: addReview,
    onSuccess: (data) => {
      queryClient.setQueryData(["review", { customerId }], data)
    },
  })
  const form = useForm<AddReviewFormData>({
    resolver: addReviewFormResolver,
    defaultValues: {
      rating: 0,
      comment: undefined,
    },
  })

  function onSubmit(values: AddReviewFormData) {
    const payload = { ...values, customerId }
    mutation.mutateAsync(payload)
  }

  return showForm ? (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Share Your Experience</CardTitle>
        <CardDescription className="text-balance">
          Provide a review based on your interaction with this customer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rate</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value.toString()}
                            className="flex items-center gap-2"
                          >
                            {[1, 2, 3, 4, 5].map((value) => (
                              <FormItem key={value}>
                                <FormControl>
                                  <RadioGroupItem
                                    value={value.toString()}
                                    className="peer sr-only"
                                  />
                                </FormControl>
                                <FormLabel
                                  className="cursor-pointer"
                                  title={`${value} stars`}
                                >
                                  <StarIcon
                                    className={cn(
                                      "h-6 w-6",
                                      field.value >= value && "fill-primary"
                                    )}
                                  />
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comment</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit">Add review</Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  ) : (
    <span className="flex">
      <Button onClick={() => setShowForm(!showForm)}>
        <Plus />
        Review this customer?
      </Button>
    </span>
  )
}
