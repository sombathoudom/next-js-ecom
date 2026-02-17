"use client"
import Link from 'next/link'
import { usePathname } from "next/navigation"


import {
  SidebarGroup, SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { adminNavigation } from "@/lib/navigation"
import { isRouteActive } from "@/lib/utils"
export function NavMain() {
  const path = usePathname();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {adminNavigation.map((item) => {
          const isActive = isRouteActive(path, item.href)
          return (
            <SidebarMenuItem key={item.title}  >
            <SidebarMenuButton asChild  isActive={isActive}>
              <Link href={item.href} className="font-medium">  {item.icon && <item.icon className="mr-2 h-4 w-4" />} {item.title}</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          )
      })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
