import { useMemo, useState } from "react";

import { PageHeader } from "../../../components/ui/page-header";
import { Select } from "../../../components/ui/select";
import { SectionCard } from "../../../components/ui/section-card";
import { StatCard } from "../components/stat-card";
import { BarChart3, MousePointerClick, TrendingUp, Users } from "lucide-react";
import { RevenueChart } from "../components/revenue-chart";

type Timeframe = "7d" | "30d" | "90d" | "1y";

const analyticsData = {
  "7d": {
    visitors: "8,420",
    conversion: "4.8%",
    clicks: "18,240",
    growth: "+6.2%",
  },
  "30d": {
    visitors: "34,880",
    conversion: "5.4%",
    clicks: "72,930",
    growth: "+12.7%",
  },
  "90d": {
    visitors: "104,300",
    conversion: "6.1%",
    clicks: "218,600",
    growth: "+19.4%",
  },
  "1y": {
    visitors: "428,900",
    conversion: "7.3%",
    clicks: "894,200",
    growth: "+42.8%",
  },
};

export function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("30d");

  const stats = useMemo(() => {
    const data = analyticsData[timeframe];

    return [
      {
        title: "Visitors",
        value: data.visitors,
        change: `${timeframe} selected`,
        changeType: "positive",
        icon: Users,
      },
      {
        title: "Conversion Rate",
        value: data.conversion,
        change: "+1.2% from previous period",
        changeType: "positive",
        icon: TrendingUp,
      },
      {
        title: "Product Clicks",
        value: data.clicks,
        change: "+8.5% from previous period",
        changeType: "positive",
        icon: MousePointerClick,
      },
      {
        title: "Growth",
        value: data.growth,
        change: "Compared to previous period",
        changeType: "positive",
        icon: BarChart3,
      },
    ] as const;
  }, [timeframe]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Analytics"
          description="Track visitor behavior, conversion performance, and product growth."
        />

        <Select
          value={timeframe}
          onChange={(event) => setTimeframe(event.target.value as Timeframe)}
          className="w-full sm:w-40"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last 1 year</option>
        </Select>
      </div>

      <SectionCard
        title="Performance Overview"
        description="Analytics metrics based on the selected timeframe."
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
        title="Revenue Analytics"
        description="Monthly revenue performance overview."
      >
        <RevenueChart />
      </SectionCard>
    </div>
  );
}