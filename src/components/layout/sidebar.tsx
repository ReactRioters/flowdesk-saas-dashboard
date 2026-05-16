import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { NavLink } from "react-router-dom";

import { useLayoutStore } from "../../store/layout-store";
import { sidebarNavItems } from "./sidebar-nav-items";

type SidebarProps = {
  open?: boolean;
  onClose?: () => void;
};

export function Sidebar({ open = true, onClose }: SidebarProps) {
  const isSidebarCollapsed = useLayoutStore(
    (state) => state.isSidebarCollapsed
  );
  const toggleSidebarCollapse = useLayoutStore(
    (state) => state.toggleSidebarCollapse
  );

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 border-r border-slate-200
          bg-white px-4 py-6 transition-all duration-300
          dark:border-slate-800 dark:bg-slate-950
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
          ${isSidebarCollapsed ? "w-20" : "w-72"}
        `}
      >
        <div className="mb-8 flex items-start justify-between">
          <div className={isSidebarCollapsed ? "hidden" : "block"}>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              FlowDesk
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              SaaS Dashboard
            </p>
          </div>

          {isSidebarCollapsed && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white dark:bg-white dark:text-slate-900">
              F
            </div>
          )}

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-1">
          {sidebarNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.href}
                end={item.href === "/"}
                onClick={onClose}
                title={isSidebarCollapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isSidebarCollapsed ? "justify-center" : ""
                  } ${
                    isActive
                      ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />

                {!isSidebarCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={toggleSidebarCollapse}
          className="absolute -right-3 bottom-6 hidden h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-100 lg:flex dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </aside>
    </>
  );
}