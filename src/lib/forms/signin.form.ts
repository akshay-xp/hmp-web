import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const signInFormSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().nonempty("Password is required"),
})

export type SignInFormData = z.infer<typeof signInFormSchema>
export const signInFormResolver = zodResolver(signInFormSchema)
