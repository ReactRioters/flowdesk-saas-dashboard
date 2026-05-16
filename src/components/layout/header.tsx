import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

import { ThemeToggle } from "../ui/theme-toggle";
import { GlobalSearch } from "./global-search";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserMenu } from "./user-menu";

type HeaderProps = {
  onOpenSidebar: () => void;
};

export function Header({ onOpenSidebar }: HeaderProps) {
  const location = useLocation();

  const pageTitleMap: Record<string, string> = {
    "/": "Dashboard",
    "/users": "Users",
    "/billing": "Billing",
    "/analytics": "Analytics",
    "/settings": "Settings",
  };

  const pageDescriptionMap: Record<string, string> = {
    "/": "Monitor your SaaS performance and activity.",
    "/users": "Manage users, roles, and account access.",
    "/billing":
      "Manage subscriptions, plans, and billing activity.",
    "/analytics":
      "Track product growth and performance insights.",
    "/settings":
      "Manage application preferences and account settings.",
  };

  const title =
    pageTitleMap[location.pathname] || "Dashboard";

  const description =
    pageDescriptionMap[location.pathname] ||
    "Monitor your SaaS performance and activity.";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <nav className="text-xs text-slate-500 dark:text-slate-400">
              <span>Dashboard</span>

              {location.pathname !== "/" && (
                <>
                  <span className="mx-2">/</span>

                  <span className="text-slate-700 dark:text-slate-300">
                    {title}
                  </span>
                </>
              )}
            </nav>

            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <GlobalSearch />

          <NotificationsDropdown />

          <ThemeToggle />

          <UserMenu />
        </div>
      </div>
    </header>
  );
}