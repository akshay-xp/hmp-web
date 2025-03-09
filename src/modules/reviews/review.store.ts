import { ResearchFormData } from "@/lib/forms/research.form"
import { create } from "zustand"

type ReviewStore = {
  customerEmail?: string
  customerPhone?: string
  customerId?: string
  setGetCustomerQueries: (values: ResearchFormData) => void
}

export const useReviewStore = create<ReviewStore>((set) => ({
  customerEmail: undefined,
  customerPhone: undefined,
  customerId: undefined,
  setGetCustomerQueries: (values: ResearchFormData) => {
    set({ customerEmail: values.email })
    set({ customerPhone: values.phone })
  },
}))
