import { useNavigate } from "@tanstack/react-router"
import { AtSign, Search } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button.tsx"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { PhoneInput } from "@/components/ui/phone-input.tsx"
import {
  ResearchFormData,
  researchFormResolver,
} from "@/lib/forms/research.form"
import { Route } from "@/routes/_private/index.tsx"

export function ResearchForm() {
  const { email, phone } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const form = useForm<ResearchFormData>({
    resolver: researchFormResolver,
    defaultValues: {
      email,
      phone,
    },
  })

  async function onSubmit(values: ResearchFormData) {
    navigate({ search: () => ({ email: values.email, phone: values.phone }) })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter an email"
                      className="pl-10"
                      {...field}
                    />
                  </FormControl>
                  <AtSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="sr-only">Phone</FormLabel>
                  <FormControl>
                    <PhoneInput placeholder="Enter a phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">
            <Search />
            Look up
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Search using email or phone number
          </p>
        </div>
      </form>
    </Form>
  )
}
