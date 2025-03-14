import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "@tanstack/react-router"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { router } from "./router"
import { queryClient } from "./query"
import { ThemeProvider } from "./modules/theme"

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <RouterProvider router={router} />
        <ReactQueryDevtools buttonPosition="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
