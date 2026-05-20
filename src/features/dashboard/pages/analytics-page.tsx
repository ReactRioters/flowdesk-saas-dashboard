import { useMemo, useState } from "react";

import { PageHeader } from "../../../components/ui/page-header";
import { Select } from "../../../components/ui/select";
import { SectionCard } from "../../../components/ui/section-card";
import { StatCard } from "../components/stat-card";
import { BarChart3, MousePointerClick, TrendingUp, Users } from "lucide-react";
import { RevenueChart } from "../components/revenue-chart";
import { TrafficSourcesChart } from "../components/traffic-sources-chart";
import { AnalyticsInsights } from "../components/analytics-insights";

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
        <RevenueChart data={revenueChartData[timeframe]} />
      </SectionCard>
      <SectionCard
        title="Traffic Sources"
        description="Breakdown of visitors by acquisition channel."
      >
        <TrafficSourcesChart />
      </SectionCard>
      <SectionCard
        title="Key Insights"
        description="Actionable observations based on current analytics data."
      >
        <AnalyticsInsights />
      </SectionCard>
    </div>
  );
}