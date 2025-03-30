import { privateApi } from "../api/axios.ts"

import { ChangePasswordFormData } from "./schema/change-password.schema.ts"
import { EditAccountFormData } from "./schema/edit-account.schema.ts"

export enum Role {
  ADMIN = "ADMIN",
  BUSINESS = "BUSINESS",
}

export type User = {
  id: number
  email: string
  name: string
  role: Role
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

export async function changePassword(
  values: ChangePasswordFormData
): Promise<void> {
  const { confirmPassword, ...payload } = values
  await privateApi.patch("/users/me/password", {
    ...payload,
  })
}
