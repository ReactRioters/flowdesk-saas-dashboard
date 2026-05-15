import { LogOut, Settings, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/auth-store";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
      >
        VP
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Vijay Patil
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Admin
            </p>
          </div>

          <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
            <User className="h-4 w-4" />
            Profile
          </button>

          <button
            onClick={() => {
              navigate("/settings");
              setOpen(false);
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 border-t border-slate-200 px-4 py-3 text-left text-sm text-red-500 hover:bg-red-50 dark:border-slate-800 dark:hover:bg-red-950/30"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}