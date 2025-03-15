import { useMutation } from "@tanstack/react-query"
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
import { Input } from "@/components/ui/input.tsx"
import { PhoneInput } from "@/components/ui/phone-input.tsx"
import {
  AddCustomerFormData,
  addCustomerFormResolver,
} from "@/lib/forms/add-customer.form"
import { queryClient } from "@/modules/query/query-client.ts"

import { addCustomer } from "../query-functions.ts"

export function AddCustomerForm({
  email,
  phone,
}: {
  email?: string
  phone?: string
}) {
  const mutation = useMutation({
    mutationFn: addCustomer,
    onSuccess: (data) => {
      queryClient.setQueryData(["customer", { email, phone }], data)
    },
  })
  const form = useForm<AddCustomerFormData>({
    resolver: addCustomerFormResolver,
    defaultValues: {
      email,
      phone,
      name: undefined,
    },
  })

  async function onSubmit(values: AddCustomerFormData) {
    mutation.mutateAsync(values)
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">No Customer Found – Add One?</CardTitle>
        <CardDescription className="text-balance">
          We couldn't find this customer in the system. You can add their
          details now to leave a review.
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
                      <FormItem className="relative">
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <PhoneInput
                            placeholder="Enter a phone number"
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit">Add Customer</Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
