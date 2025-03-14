import {
  AddReviewFormData,
  addReviewFormResolver,
} from "@/lib/forms/add-review.form"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { StarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useReviewStore } from "@/modules/reviews"
import { Button } from "@/components/ui/button"

export function AddReviewForm({ customerId }: { customerId?: number }) {
  const form = useForm<AddReviewFormData>({
    resolver: addReviewFormResolver,
    defaultValues: {
      rating: 0,
      comment: undefined,
    },
  })

  function onSubmit(values: AddReviewFormData) {
    useReviewStore.getState().addReview(values, customerId)
  }

  return (
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
  )
}
