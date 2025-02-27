import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
})

export type SignInFormData = z.infer<typeof signInFormSchema>
export const signInFormResolver = zodResolver(signInFormSchema)
