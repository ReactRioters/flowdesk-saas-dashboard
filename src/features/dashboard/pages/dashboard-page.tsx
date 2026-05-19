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