import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "@tanstack/react-router"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ThemeProvider } from "@/modules/theme/theme-provider"
import { queryClient } from "@/query/query-client"
import { router } from "@/router/tanstack-router"

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
