import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  ResearchFormData,
  researchFormResolver,
} from "@/lib/forms/research.form"
import { useReviewStore } from "@/modules/reviews"
import { useForm } from "react-hook-form"

export function ResearchForm() {
  const setGetCustomerQueries = useReviewStore(
    (state) => state.setGetCustomerQueries
  )
  const form = useForm<ResearchFormData>({
    resolver: researchFormResolver,
    defaultValues: {
      email: undefined,
      phone: undefined,
    },
  })

  async function onSubmit(values: ResearchFormData) {
    setGetCustomerQueries(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Look up</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
