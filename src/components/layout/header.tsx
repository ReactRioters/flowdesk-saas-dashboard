import { Menu, Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../store/theme-store";
import { useLocation } from "react-router-dom";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserMenu } from "./user-menu";
import { GlobalSearch } from "./global-search";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({
  onMenuClick,
}: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore();
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
    "/billing": "Manage subscriptions, plans, and billing activity.",
    "/analytics": "Track product growth and performance insights.",
    "/settings": "Manage application preferences and account settings.",
  };

  const title = pageTitleMap[location.pathname] || "Dashboard";
  const description =
    pageDescriptionMap[location.pathname] ||
    "Monitor your SaaS performance and activity.";
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-300 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
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

          <button
            onClick={toggleTheme}
            className="rounded-xl border border-gray-300 bg-white p-2 text-slate-400 hover:text-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-600"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <NotificationsDropdown />

          <UserMenu />
        </div>
      </div>
    </header>
  );
}