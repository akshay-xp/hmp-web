import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

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
import { useAuthStore } from "@/modules/auth/auth-store.ts"

import { changePassword } from "../account.apis.ts"
import {
  ChangePasswordFormData,
  changePasswordFormResolver,
} from "../schema/change-password.schema.ts"

export function ChangePasswordForm() {
  const signout = useAuthStore((state) => state.signout)
  const form = useForm<ChangePasswordFormData>({
    resolver: changePasswordFormResolver,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })
  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Your password has been successfully updated.")
      form.reset()
      signout()
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.status === 403) {
          form.setError("root", {
            message:
              "The current password you entered is incorrect. Please try again.",
          })
        } else if (error.status === 400) {
          form.setError("root", {
            message:
              typeof error.response?.data.message === "string"
                ? error.response.data.message
                : error.response?.data.message[0],
          })
        } else {
          form.setError("root", {
            message:
              "Something went wrong while updating your password. Please try again later.",
          })
        }
      } else {
        form.setError("root", {
          message:
            "Something went wrong while updating your password. Please try again later.",
        })
      }
    },
  })

  async function onSubmit(values: ChangePasswordFormData) {
    mutation.mutateAsync(values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. After saving, you'll be logged out.
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
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormMessage>{form.formState.errors.root?.message}</FormMessage>
                {mutation.isPending ? (
                  <Button disabled>
                    <Loader2 className="animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit">Save Password</Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
