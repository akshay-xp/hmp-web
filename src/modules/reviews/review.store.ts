import { privateApi } from "@/api/axios"
import { AddCustomerFormData } from "@/lib/forms/add-customer.form"
import { AddReviewFormData } from "@/lib/forms/add-review.form"
import { queryClient } from "@/query"
import { create } from "zustand"

type ReviewStore = {
  addReview: (values: AddReviewFormData, customerId?: number) => void
  addCustomer: (values: AddCustomerFormData) => void
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
  addCustomer: async (values: AddCustomerFormData) => {
    await privateApi.post("customer", {
      ...values,
    })
    // mutate get review instead
    queryClient.invalidateQueries({ queryKey: ["customer"] })
  },
}))
