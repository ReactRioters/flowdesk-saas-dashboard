import {
  BarChart3,
  CreditCard,
  FolderGit2,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

export const sidebarNavItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderGit2,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
] as const;