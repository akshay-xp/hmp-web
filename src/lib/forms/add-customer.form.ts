import { zodResolver } from "@hookform/resolvers/zod"
import { isValidPhoneNumber } from "react-phone-number-input"
import { z } from "zod"

const addCustomerFormSchema = z
  .object({
    email: z
      .string()
      .email("Enter a valid email address")
      .or(z.literal("").transform(() => undefined)),
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: "Enter a valid phone number" })
      .or(z.literal("").transform(() => undefined)),
    name: z.string(),
  })
  .partial()

export type AddCustomerFormData = z.infer<typeof addCustomerFormSchema>
export const addCustomerFormResolver = zodResolver(addCustomerFormSchema)
