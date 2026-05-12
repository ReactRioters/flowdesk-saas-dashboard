import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="hidden flex-1 bg-slate-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold">FlowDesk</h1>
          <p className="mt-2 text-sm text-slate-400">
            SaaS dashboard for modern teams.
          </p>
        </div>

        <div>
          <h2 className="text-4xl font-bold leading-tight">
            Manage your SaaS growth from one clean dashboard.
          </h2>
          <p className="mt-4 max-w-lg text-slate-400">
            Track revenue, users, billing, and product performance with a scalable admin experience.
          </p>
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center px-4 py-10">
        {children}
      </section>
    </main>
  );
}