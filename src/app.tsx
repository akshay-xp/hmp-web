import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RouterProvider } from "@tanstack/react-router"

import { queryClient } from "@/modules/query/query-client.ts"
import { router } from "@/modules/router/tanstack-router.ts"
import { ThemeProvider } from "@/modules/theme/theme-provider.tsx"

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
