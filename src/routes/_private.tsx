import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

import { AppSidebar } from "@/components/app-sidebar.tsx"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar.tsx"
import { getUser } from "@/modules/account/account.apis.ts"
import { useAuthStore } from "@/modules/auth/auth-store.ts"

export const Route = createFileRoute("/_private")({
  beforeLoad: async ({ location }) => {
    if (!useAuthStore.getState().accessToken) {
      const newAccessToken =
        !useAuthStore.getState().isRefreshRetry &&
        (await useAuthStore.getState().refreshToken())
      if (!newAccessToken) {
        throw redirect({
          to: "/signin",
          search: {
            redirect: location.href,
          },
        })
      }
    }
  },
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: ["user"],
      queryFn: getUser,
    }),
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-grid sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Research</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
