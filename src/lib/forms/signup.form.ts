import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const signUpFormSchema = z
  .object({
    email: z.string().email("Enter a valid email address"),
    name: z.string().nonempty("Name cannot be empty"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match. Please re-enter your password",
    path: ["repeatPassword"],
  })

export type SignUpFormData = z.infer<typeof signUpFormSchema>
export const signUpFormResolver = zodResolver(signUpFormSchema)
