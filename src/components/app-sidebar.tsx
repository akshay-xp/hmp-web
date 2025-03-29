import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { CircleHelp, Flag, Headset, Send, Star } from "lucide-react"

import { NavLogo } from "@/components/nav-logo.tsx"
import { NavUser } from "@/components/nav-user.tsx"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar.tsx"
import { getUser, Role } from "@/modules/account/account.apis.ts"

const primary = [
  {
    title: "Research Customers",
    url: "/",
    isActive: true,
    icon: Star,
  },
  {
    title: "Moderate Reviews",
    url: "/moderation",
    isActive: false,
    icon: Flag,
    role: Role.ADMIN,
  },
]

const secondary = [
  {
    title: "FAQ",
    url: "/faq",
    isActive: false,
    icon: CircleHelp,
  },
  {
    title: "Support",
    url: "/support",
    isActive: false,
    icon: Headset,
  },
  {
    title: "Feedback",
    url: "/feedback",
    isActive: false,
    icon: Send,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  })

  return (
    isSuccess && (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <NavLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {primary.map(
                  (item) =>
                    (!item.role || data.role === item.role) && (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                          <Link to={item.url}>
                            <item.icon /> {item.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {secondary.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link to={item.url}>
                        <item.icon /> {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
  )
}
