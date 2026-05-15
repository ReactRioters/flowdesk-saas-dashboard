import { Bell, LogOut, Menu, Moon, Search, Sun } from "lucide-react";
import { useThemeStore } from "../../store/theme-store";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth-store";
import { NotificationsDropdown } from "./notifications-dropdown";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({
  onMenuClick,
}: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
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
              Dashboard
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Monitor your SaaS performance and activity.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden items-center gap-2 rounded-xl border border-gray-300 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-400 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-slate-600 sm:flex">
            <Search className="h-4 w-4" />
            Search
          </button>

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

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}