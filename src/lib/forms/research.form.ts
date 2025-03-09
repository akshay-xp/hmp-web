import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const researchFormSchema = z
  .object({
    email: z.string().email(),
    phone: z.string(),
  })
  .partial()

export type ResearchFormData = z.infer<typeof researchFormSchema>
export const researchFormResolver = zodResolver(researchFormSchema)
