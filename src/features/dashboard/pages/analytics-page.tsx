import { useEffect, useMemo, useState } from "react";

import { PageHeader } from "../../../components/ui/page-header";
import { Select } from "../../../components/ui/select";
import { SectionCard } from "../../../components/ui/section-card";
import { StatCard } from "../components/stat-card";
import { BarChart3, Download, MousePointerClick, TrendingUp, Users } from "lucide-react";
import { RevenueChart } from "../components/revenue-chart";
import { TrafficSourcesChart } from "../components/traffic-sources-chart";
import { AnalyticsInsights } from "../components/analytics-insights";
import { AnalyticsSkeleton } from "../components/analytics-skeleton";
import { ActivityFeed } from "../components/activity-feed";
import { TopPagesTable } from "../components/top-pages-table";
import { downloadCSV } from "../../../utils/download-csv";
import { Button } from "../../../components/ui/button";

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
    visitors: {
      current: 8420,
      previous: 7910,
    },
    conversion: {
      current: 4.8,
      previous: 4.1,
    },

    clicks: {
      current: 18240,
      previous: 16900,
    },

    growth: {
      current: 6.2,
      previous: 4.8,
    }
  },
  "30d": {
    visitors: {
      current: 34880,
      previous: 31200,
    },
    conversion: {
      current: 5.4,
      previous: 4.8,
    },
    clicks: {
      current: 72930,
      previous: 65400,
    },
    growth: {
      current: 12.7,
      previous: 10.2,
    },
  },
  "90d": {
    visitors: {
      current: 104300,
      previous: 87600,
    },
    conversion: {
      current: 6.1,
      previous: 5.2,
    },
    clicks: {
      current: 218600,
      previous: 189000,
    },
    growth: {
      current: 19.4,
      previous: 15.6,
    },
  },
  "1y": {
    visitors: {
      current: 428900,
      previous: 298000,
    },
    conversion: {
      current: 7.3,
      previous: 5.8,
    },
    clicks: {
      current: 894200,
      previous: 650000,
    },
    growth: {
      current: 42.8,
      previous: 25.0,
    },
  },
};

export function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("30d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleExportReport = () => {
    downloadCSV("analytics-report.csv", [
      {
        metric: "Visitors",
        value: analyticsData[timeframe].visitors,
      },
      {
        metric: "Conversion Rate",
        value: analyticsData[timeframe].conversion,
      },
      {
        metric: "Product Clicks",
        value: analyticsData[timeframe].clicks,
      },
      {
        metric: "Growth",
        value: analyticsData[timeframe].growth,
      },
    ]);
  };

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

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Analytics"
          description="Track visitor behavior, conversion performance, and product growth."
        />

        <div className="flex items-center gap-3">
          <Select
            value={timeframe}
            onChange={(event) =>
              setTimeframe(event.target.value as Timeframe)
            }
            className="w-full sm:w-40"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last 1 year</option>
          </Select>

          <Button
            type="button"
            onClick={handleExportReport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
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
      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard
          title="Revenue Analytics"
          description="Revenue performance based on selected timeframe."
        >
          <RevenueChart data={revenueChartData[timeframe]} />
        </SectionCard>

        <SectionCard
          title="Traffic Sources"
          description="Breakdown of visitors by acquisition channel."
        >
          <TrafficSourcesChart />
        </SectionCard>
      </div>
      <SectionCard
        title="Key Insights"
        description="Actionable observations based on current analytics data."
      >
        <AnalyticsInsights />
      </SectionCard>
      <SectionCard
        title="Recent Activity"
        description="Latest workspace and billing events."
      >
        <ActivityFeed />
      </SectionCard>
      <SectionCard
        title="Top Performing Pages"
        description="Highest traffic and conversion pages."
      >
        <TopPagesTable />
      </SectionCard>
    </div>
  );
}