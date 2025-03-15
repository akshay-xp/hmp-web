import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link } from "@tanstack/react-router"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { useAuthStore } from "@/modules/auth/auth-store"
import { SignInFormData, signInFormResolver } from "@/lib/forms/signin.form"
import { toast } from "sonner"
import { AxiosError } from "axios"

export function SigninForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<SignInFormData>({
    resolver: signInFormResolver,
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: SignInFormData) {
    try {
      await useAuthStore.getState().signin(values)
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        toast.error("Something went wrong.", {
          description: "Your sign in request failed. Please try again.",
        })
      } else if (error.response?.status === 400) {
        toast.error("Data validation failed.", {
          description: "Please ensure all fields meet the required criteria.",
        })
      } else if (error.response?.status === 403) {
        toast.error("Authentication failed.", {
          description: "Please ensure that your credentials are correct.",
        })
      } else {
        toast.error("Sign in failed.", {
          description: "Your sign in request failed. Please try again.",
        })
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to continue
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
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center">
                            <FormLabel>Password</FormLabel>
                            <Link
                              to="/forgot-password"
                              className="ml-auto text-sm underline-offset-4 hover:underline"
                            >
                              Forgot your password?
                            </Link>
                          </div>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Continue
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our&nbsp;
        <Link to=".">Terms of Service</Link> and&nbsp;
        <Link to=".">Privacy Policy</Link>.
      </div>
    </div>
  )
}
