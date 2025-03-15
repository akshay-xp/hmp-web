import { createRouter } from "@tanstack/react-router"

import { queryClient } from "@/modules/query/query-client.ts"
import { routeTree } from "@/routeTree.gen"

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
