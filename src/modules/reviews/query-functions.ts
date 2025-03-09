import { privateApi } from "@/api/axios"
import { useReviewStore } from "./review.store"

export const getCustomer = async (email?: string, phone?: string) => {
  const response = await privateApi.get("/customer", {
    params: {
      email,
      phone,
    },
  })

  useReviewStore.setState({ customerId: response.data.id })
  return response.data
}

export const getReview = async (customerId?: string) => {
  const response = await privateApi.get("/review", {
    params: {
      customerId,
    },
  })

  return response.data
}

export const getReviews = async (customerId?: string) => {
  const response = await privateApi.get("/review/all", {
    params: {
      customerId,
    },
  })

  return response.data
}
