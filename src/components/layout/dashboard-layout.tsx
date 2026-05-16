import type { ReactNode } from "react";
import { useState } from "react";

import { useLayoutStore } from "../../store/layout-store";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isSidebarCollapsed = useLayoutStore(
    (state) => state.isSidebarCollapsed
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={
          isSidebarCollapsed
            ? "lg:pl-20"
            : "lg:pl-72"
        }
      >
        <Header onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}