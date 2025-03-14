import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const addCustomerFormSchema = z
  .object({
    email: z.string().email(),
    phone: z.string(),
    name: z.string(),
  })
  .partial()

export type AddCustomerFormData = z.infer<typeof addCustomerFormSchema>
export const addCustomerFormResolver = zodResolver(addCustomerFormSchema)
