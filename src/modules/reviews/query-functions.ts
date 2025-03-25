import { AddCustomerFormData } from "@/lib/forms/add-customer.form.ts"
import { AddReviewFormData } from "@/lib/forms/add-review.form.ts"
import { privateApi } from "@/modules/api/axios.ts"

type Customer = {
  id: number
  name: string | null
  phone: string | null
  email: string | null
  createdAt: string
  updatedAt: string
}

export type Review = {
  rating: number
  comment: string | null
  customerId: number
  businessId: number
  createdAt: string
  updatedAt: string
  tags: {
    tagId: number
    customerId: number
    businessId: number
  }[]
}

type Reviews = {
  reviews: Review[]
  cursorA: number
  cursorB: number
  hasMore: boolean
}

type ReviewCount = {
  ratings: Record<number, number>
  tags: Record<number, number>
}

type Tag = {
  id: number
  name: string
  type: "POSITIVE" | "NEGATIVE"
}

export const getCustomer = async (
  email?: string,
  phone?: string
): Promise<Customer | null> => {
  const response = await privateApi.get("/customer", {
    params: {
      email,
      phone,
    },
  })

  return response.data
}

export const getReview = async (
  customerId?: number
): Promise<Review | null> => {
  const response = await privateApi.get(`/review/${customerId}`)

  return response.data
}

export const getReviews = async (
  pageParam: { cursorA: number; cursorB: number },
  customerId?: number,
  rating?: number,
  sortBy?: string
): Promise<Reviews> => {
  const cursors =
    pageParam.cursorA !== -1 && pageParam.cursorB !== -1
      ? {
          ...pageParam,
        }
      : undefined
  const response = await privateApi.get(`/review/${customerId}/all`, {
    params: {
      rating,
      sortBy,
      ...cursors,
    },
  })

  return response.data
}

export const addCustomer = async (
  values: AddCustomerFormData
): Promise<Customer> => {
  const response = await privateApi.post("customer", {
    ...values,
  })

  return response.data
}

export const addReview = async (
  values: AddReviewFormData & { customerId: number }
) => {
  const { customerId, reviewTags, ...payload } = values
  const response = await privateApi.post(`review/${customerId}`, {
    ...payload,
    tags: reviewTags?.map(Number),
  })

  return response.data
}

export const editReview = async (
  values: AddReviewFormData & { customerId: number }
) => {
  const { customerId, reviewTags, ...payload } = values
  const response = await privateApi.patch(`review/${customerId}`, {
    ...payload,
    tags: reviewTags?.map(Number),
  })

  return response.data
}

export const deleteReview = async (customerId: number) => {
  const response = await privateApi.delete(`review/${customerId}`)

  return response.data
}

export const getReviewsCount = async (
  customerId: number
): Promise<ReviewCount> => {
  const response = await privateApi.get(`review/${customerId}/count`)

  return response.data
}

export const getReviewTags = async (): Promise<Map<number, Tag>> => {
  const response = await privateApi.get("review-tags")

  const map = new Map()
  response.data.map((tag: Tag) => {
    map.set(tag.id, tag)
  })
  return map
}
