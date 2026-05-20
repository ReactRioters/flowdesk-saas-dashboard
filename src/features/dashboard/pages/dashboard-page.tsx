import {
  CreditCard,
  DollarSign,
  TrendingDown,
  Users,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { SectionCard } from "../../../components/ui/section-card";
import { getDashboardStats } from "../../../services/dashboard-service";
import { StatCard } from "../components/stat-card";
import { RecentActivity } from "../components/recent-activity";
import { RevenueChart } from "../components/revenue-chart";
import { StatCardSkeleton } from "../components/stat-card-skeleton";
import { PageHeader } from "../../../components/ui/page-header";

const statIcons = {
  revenue: DollarSign,
  users: Users,
  subscriptions: CreditCard,
  churn: TrendingDown,
};

type Timeframe = "7d" | "30d" | "90d" | "1y";

const revenueChartData = {
  "7d": [
    { label: "Mon", revenue: 4200 },
    { label: "Tue", revenue: 5100 },
    { label: "Wed", revenue: 4600 },
    { label: "Thu", revenue: 6200 },
    { label: "Fri", revenue: 7400 },
    { label: "Sat", revenue: 6900 },
    { label: "Sun", revenue: 8200 },
  ],
  "30d": [
    { label: "Week 1", revenue: 18000 },
    { label: "Week 2", revenue: 22500 },
    { label: "Week 3", revenue: 24800 },
    { label: "Week 4", revenue: 31200 },
  ],
  "90d": [
    { label: "Jan", revenue: 62000 },
    { label: "Feb", revenue: 73500 },
    { label: "Mar", revenue: 84200 },
  ],
  "1y": [
    { label: "Q1", revenue: 210000 },
    { label: "Q2", revenue: 248000 },
    { label: "Q3", revenue: 291000 },
    { label: "Q4", revenue: 342000 },
  ],
};

export function DashboardPage() {
  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Track revenue, users, subscriptions, and product growth."
      />

      <SectionCard
        title="Business Metrics"
        description="Key SaaS growth indicators and performance tracking."
      >
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <StatCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
                icon={statIcons[stat.icon]}
              />
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="Revenue Overview"
        description="Monthly recurring revenue growth over the last 6 months."
      >
        <RevenueChart data={revenueChartData["30d"]} />
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