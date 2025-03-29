import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const reportReviewFormSchema = z.object({
  reason: z.string().optional(),
})

export type ReportReviewFormData = z.infer<typeof reportReviewFormSchema>
export const reportReviewFormResolver = zodResolver(reportReviewFormSchema)
