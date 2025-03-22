import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const editAccountFormSchema = z.object({
  name: z.string().nonempty("Name cannot be empty"),
  email: z.string().email("Enter a valid email address"),
})

export type EditAccountFormData = z.infer<typeof editAccountFormSchema>
export const editAccountFormResolver = zodResolver(editAccountFormSchema)
