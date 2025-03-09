import { privateApi } from "@/api/axios"
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
import { useForm } from "react-hook-form"

export function ResearchForm() {
  const form = useForm<ResearchFormData>({
    resolver: researchFormResolver,
    defaultValues: {
      email: undefined,
      phone: undefined,
    },
  })

  async function onSubmit(values: ResearchFormData) {
    privateApi.get("/customer", {
      params: { email: values.email, phone: values.phone },
    })
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
