import {
  CreditCard,
  DollarSign,
  TrendingDown,
  Users,
} from "lucide-react";

import { SectionCard } from "../../../components/ui/section-card";
import { StatCard } from "../components/stat-card";
import { RevenueChart } from "../components/revenue-chart";
import { RecentActivity } from "../components/recent-activity";

const stats = [
  {
    title: "Total Revenue",
    value: "$48,240",
    change: "+12.5% from last month",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "12,450",
    change: "+8.2% from last month",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Subscriptions",
    value: "2,430",
    change: "+5.1% from last month",
    changeType: "positive",
    icon: CreditCard,
  },
  {
    title: "Churn Rate",
    value: "2.4%",
    change: "-0.8% from last month",
    changeType: "negative",
    icon: TrendingDown,
  },
] as const;

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Overview
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Track revenue, users, subscriptions, and product growth.
        </p>
      </div>

      <SectionCard
        title="Business Metrics"
        description="Key SaaS growth indicators and performance tracking."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
            />
          ))}
        </div>
      </SectionCard>
      <SectionCard
        title="Revenue Overview"
        description="Monthly recurring revenue growth over the last 6 months."
      >
        <RevenueChart />
      </SectionCard>
      <SectionCard
        title="Recent Activity"
        description="Latest user and subscription activity across the platform."
      >
        <RecentActivity />
      </SectionCard>
    </div>
  );
}