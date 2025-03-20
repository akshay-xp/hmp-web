import { privateApi } from "../api/axios.ts"

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
