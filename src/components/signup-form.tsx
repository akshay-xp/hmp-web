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
import { SignUpFormData, signUpFormResolver } from "@/lib/forms/signup.form"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { useAuthStore } from "@/auth"
import { AxiosError } from "axios"
import { toast } from "sonner"

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<SignUpFormData>({
    resolver: signUpFormResolver,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  })

  async function onSubmit(values: SignUpFormData) {
    try {
      await useAuthStore.getState().signup(values)
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        toast.error("Something went wrong.", {
          description: "Your sign up request failed. Please try again.",
        })
      } else if (error.response?.status === 409) {
        toast.error("Credentials taken.", {
          description: "An account with this email or username already exists.",
        })
      } else if (error.response?.status === 400) {
        toast.error("Data validation failed.", {
          description: "Please ensure all fields meet the required criteria.",
        })
      } else {
        toast.error("Registration failed.", {
          description: "Your sign up request failed. Please try again.",
        })
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create you account</CardTitle>
          <CardDescription>Sign up to access Reverse Int.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Example Hotel"
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
                          <FormLabel>Password</FormLabel>
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
                      name="repeatPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Repeat Password</FormLabel>
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
                  Already have an account?&nbsp;
                  <Link to="/signin" className="underline underline-offset-4">
                    Sign in
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
