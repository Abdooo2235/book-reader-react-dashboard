import {
  LayoutDashboard,
  Book,
  FolderOpen,
  Users,
  Settings,
  LogOut,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export const NAVIGATION_CONFIG: NavSection[] = [
  {
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
        description: "Overview and statistics",
      },
      {
        title: "Books",
        href: "/books",
        icon: Book,
        description: "Manage all books",
      },
      {
        title: "Categories",
        href: "/categories",
        icon: FolderOpen,
        description: "Manage book categories",
      },
      {
        title: "Users",
        href: "/users",
        icon: Users,
        description: "View registered users",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        description: "Customize appearance",
      },
    ],
  },
];

export const LOGOUT_ITEM: NavItem = {
  title: "Logout",
  href: "/logout",
  icon: LogOut,
  description: "Sign out of your account",
};
