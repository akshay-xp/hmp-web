import { create } from "zustand"

import { SignInFormData } from "@/lib/forms/signin.form.ts"
import { SignUpFormData } from "@/lib/forms/signup.form.ts"
import { defaultApi } from "@/modules/api/axios.ts"
import { router } from "@/modules/router/tanstack-router.ts"

type AuthStore = {
  accessToken: string | null
  isRefreshRetry: boolean
  refreshToken: () => Promise<string | null>
  signin: (values: SignInFormData) => Promise<void>
  signup: (values: SignUpFormData) => Promise<void>
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
  signup: async (values: SignUpFormData) => {
    const { repeatPassword, ...payload } = values
    const response = await defaultApi.post("auth/signup", payload)
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
