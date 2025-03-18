import { zodResolver } from "@hookform/resolvers/zod"
import { isValidPhoneNumber } from "react-phone-number-input"
import { z } from "zod"

export const researchFormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email({ message: "Enter a valid email" })
      .or(z.literal("").transform(() => undefined)),
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: "Enter a valid phone number" })
      .or(z.literal("").transform(() => undefined)),
    rating: z.number().int().max(5).min(1).optional(),
    sortBy: z.enum(["createdAt", "updatedAt"]).default("createdAt"),
    order: z.enum(["asc", "desc"]).default("desc"),
  })
  .partial()

export type ResearchFormData = z.infer<typeof researchFormSchema>
export const researchFormResolver = zodResolver(researchFormSchema)
