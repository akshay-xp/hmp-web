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
import { queryClient } from "@/modules/query/query-client.ts"

import { updateUser } from "../account.apis.ts"
import {
  EditAccountFormData,
  editAccountFormResolver,
} from "../schema/edit-account.schema.ts"

export function EditAccountForm({ email, name }: EditAccountFormData) {
  const form = useForm<EditAccountFormData>({
    resolver: editAccountFormResolver,
    defaultValues: {
      email,
      name,
    },
  })
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data)
    },
  })

  async function onSubmit(values: EditAccountFormData) {
    mutation.mutateAsync(values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
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
                <Button type="submit">Save changes</Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
