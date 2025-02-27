import { defaultApi } from "@/api/axios"
import { SignInFormData } from "@/lib/forms/signin.form"
import { router } from "@/router"
import { create } from "zustand"

type AuthStore = {
  accessToken: string | null
  isRefreshRetry: boolean
  refreshToken: () => Promise<string | null>
  signin: (values: SignInFormData) => Promise<void>
  signout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  isRefreshRetry: false,
  refreshToken: async () => {
    try {
      const response = await defaultApi("auth/refresh")
      const accessToken = response.data.accessToken
      set({ accessToken })
      return accessToken
    } catch {
      set({ accessToken: null })
      set({ isRefreshRetry: true })
      router.navigate({ to: "/signin" })
      return null
    }
  },
  signin: async (values: SignInFormData) => {
    const response = await defaultApi.post("auth/signin", values)
    set({ accessToken: response.data.accessToken })
    set({ isRefreshRetry: false })
    router.navigate({ to: "/" })
  },
  signout: async () => {
    await defaultApi.get("/auth/signout")
    set({ accessToken: null })
    router.navigate({ to: "/signin" })
  },
}))
