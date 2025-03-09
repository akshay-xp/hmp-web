import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const addReviewFormSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().optional(),
})

export type AddReviewFormData = z.infer<typeof addReviewFormSchema>
export const addReviewFormResolver = zodResolver(addReviewFormSchema)
