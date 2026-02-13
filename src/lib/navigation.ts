import { House, Users } from "lucide-react"
import { ROUTES } from "./routes";

export const adminNavigation = [
  {
    title: "Dashboard",
    icon: House,
    href: ROUTES.admin.dashboard.path,
    roles: ROUTES.admin.dashboard.roles,
  },
  {
    title: "Users",
    icon: Users,
    href: ROUTES.admin.users.root.path,
    roles: ROUTES.admin.users.root.roles,
  },
]
