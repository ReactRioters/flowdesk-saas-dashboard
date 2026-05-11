export function DashboardPage() {
  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          Overview
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Track revenue, users, subscriptions, and product growth.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Total Revenue</p>
          <h3 className="mt-2 text-2xl font-bold text-white">$48,240</h3>
          <p className="mt-2 text-sm text-emerald-400">+12.5% from last month</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Active Users</p>
          <h3 className="mt-2 text-2xl font-bold text-white">12,450</h3>
          <p className="mt-2 text-sm text-emerald-400">+8.2% from last month</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Subscriptions</p>
          <h3 className="mt-2 text-2xl font-bold text-white">2,430</h3>
          <p className="mt-2 text-sm text-emerald-400">+5.1% from last month</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Churn Rate</p>
          <h3 className="mt-2 text-2xl font-bold text-white">2.4%</h3>
          <p className="mt-2 text-sm text-red-400">-0.8% from last month</p>
        </div>
      </div>
    </section>
  );
}