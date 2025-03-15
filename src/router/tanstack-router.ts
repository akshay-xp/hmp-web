import { queryClient } from "@/query/query-client"
import { routeTree } from "@/routeTree.gen"
import { createRouter } from "@tanstack/react-router"

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
})
