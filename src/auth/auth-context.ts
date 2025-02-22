import { createContext } from "react"

export type Auth = {
  accessToken: string
  userId: string
}

type AuthProviderState = {
  auth: Auth
  setAuth: (auth: Auth) => void
}

const initialState: AuthProviderState = {
  auth: { accessToken: "", userId: "" },
  setAuth: () => null,
}

export const AuthContext = createContext<AuthProviderState>(initialState)
