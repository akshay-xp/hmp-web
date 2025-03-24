import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const addReviewFormSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().optional(),
  reviewTags: z.array(z.string()).optional(),
})

export type AddReviewFormData = z.infer<typeof addReviewFormSchema>
export const addReviewFormResolver = zodResolver(addReviewFormSchema)
