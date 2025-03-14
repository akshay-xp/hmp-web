import { GalleryVerticalEnd } from "lucide-react"

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"

export function NavLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link
          to="/"
          className="flex items-center gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="grid flex-1 text-left leading-tight">
            <span className="truncate font-semibold">Reverse Int.</span>
          </div>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
