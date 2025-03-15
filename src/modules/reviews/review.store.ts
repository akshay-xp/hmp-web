import { create } from "zustand"

import { AddReviewFormData } from "@/lib/forms/add-review.form.ts"
import { privateApi } from "@/modules/api/axios.ts"
import { queryClient } from "@/modules/query/query-client.ts"

type ReviewStore = {
  addReview: (values: AddReviewFormData, customerId?: number) => void
}

export const useReviewStore = create<ReviewStore>(() => ({
  addReview: async (values: AddReviewFormData, customerId?: number) => {
    await privateApi.post("review", {
      ...values,
      customerId,
    })
    // mutate get review instead
    queryClient.invalidateQueries({ queryKey: ["review"] })
    queryClient.invalidateQueries({ queryKey: ["reviews"] })
  },
}))
