import { privateApi } from "../api/axios.ts"

import { EditAccountFormData } from "./schema/edit-account.schema.ts"

type User = {
  id: number
  email: string
  name: string
  createdAt: string
  updatedAt: string
}

export async function getUser(): Promise<User> {
  const response = await privateApi.get("/users/me")
  return response.data
}

export async function updateUser(payload: EditAccountFormData): Promise<User> {
  const response = await privateApi.patch("/users/me", {
    ...payload,
  })
  return response.data
}
