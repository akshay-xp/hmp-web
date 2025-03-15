import { privateApi } from "@/modules/api/axios"

type Customer = {
  id: number
  name: string | null
  phone: string | null
  email: string | null
  createdAt: string
  updatedAt: string
} | null

type Review = {
  createdAt: string
  updatedAt: string
  rating: number
  comment: string | null
  customerId: number
  businessId: number
} | null

type Reviews = {
  reviews: {
    rating: number
    comment: string | null
    customerId: number
    businessId: number
    createdAt: string
    updatedAt: string
  }[]
}

export const getCustomer = async (
  email?: string,
  phone?: string
): Promise<Customer> => {
  const response = await privateApi.get("/customer", {
    params: {
      email,
      phone,
    },
  })

  return response.data
}

export const getReview = async (customerId?: number): Promise<Review> => {
  const response = await privateApi.get("/review", {
    params: {
      customerId,
    },
  })

  return response.data
}

export const getReviews = async (customerId?: number): Promise<Reviews> => {
  const response = await privateApi.get("/review/all", {
    params: {
      customerId,
    },
  })

  return response.data
}
