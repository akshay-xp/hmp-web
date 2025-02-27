import { useAuthStore } from "@/auth"
import axios, { AxiosError } from "axios"

/**
 * Axios instance for public routes
 */
const defaultApi = axios.create({
  baseURL: import.meta.env.VITE_REST_BASE_URL,
  withCredentials: true,
})

/**
 * Axios instance for private routes
 */
const privateApi = axios.create({
  baseURL: import.meta.env.VITE_REST_BASE_URL,
  withCredentials: true,
})

privateApi.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken
    if (!config.headers.Authorization && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

type AxiosErrorConfig = AxiosError["config"] & { _retry?: boolean }

// Handle token expiration & refresh automatically
privateApi.interceptors.response.use(
  (response) => response, // If response is successful, return it
  async (error: AxiosError) => {
    const originalRequest: AxiosErrorConfig | undefined = error.config

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // flag after first try
      originalRequest._retry = true

      // Call refresh api
      const newAccessToken = await useAuthStore.getState().refreshToken()
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

      // retry the original request with the new access token
      return privateApi(originalRequest)
    }

    return Promise.reject(error)
  }
)

export { defaultApi, privateApi }
