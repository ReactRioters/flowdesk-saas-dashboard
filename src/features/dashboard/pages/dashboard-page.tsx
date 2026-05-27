import {
  CreditCard,
  DollarSign,
  TrendingDown,
  Users,
} from "lucide-react";
import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import { SectionCard } from "../../../components/ui/section-card";
import { getDashboardStats, getRevenueData } from "../../../services/dashboard-service";
import { StatCard } from "../components/stat-card";
import { RecentActivity } from "../components/recent-activity";
import { RevenueChart } from "../components/revenue-chart";
import type { RevenueChartHandle } from "../components/revenue-chart";
import { StatCardSkeleton } from "../components/stat-card-skeleton";
import { PageHeader } from "../../../components/ui/page-header";
import { Button } from "../../../components/ui/button";
import { downloadCSV } from "../../../utils/download-csv";
import { toast } from "sonner";
import { cn } from "../../../utils/cn";

const statIcons = {
  revenue: DollarSign,
  users: Users,
  subscriptions: CreditCard,
  churn: TrendingDown,
};



export function DashboardPage() {
  const [revenueTimeframe, setRevenueTimeframe] = useState<"7d" | "30d" | "90d" | "1y">("30d");
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  const {
    data: timeframeData = [],
    isLoading: isRevenueLoading,
  } = useQuery({
    queryKey: ["revenue-data", revenueTimeframe],
    queryFn: () => getRevenueData(revenueTimeframe),
  });

  const totalRevenue = timeframeData.reduce((sum, item) => sum + item.revenue, 0);
  const averageRevenue = timeframeData.length ? Math.round(totalRevenue / timeframeData.length) : 0;

  const handleExportMetrics = () => {
    if (!stats.length) return;

    downloadCSV(
      "business-metrics.csv",
      stats.map((stat) => ({
        title: stat.title,
        value: stat.value,
        change: stat.change,
        changeType: stat.changeType,
      })),
      [
        { key: "title", label: "Metric" },
        { key: "value", label: "Value" },
        { key: "change", label: "Change" },
        { key: "changeType", label: "Trend" },
      ]
    );
  };

  const handleExportRevenue = () => {
    downloadCSV(
      "revenue-data.csv",
      timeframeData.map((item) => ({
        period: item.label,
        revenue: item.revenue,
      })),
      [
        { key: "period", label: "Period" },
        { key: "revenue", label: "Revenue" },
      ]
    );
  };

  const chartRef = useRef<RevenueChartHandle | null>(null);

  const handleExportPNG = async () => {
    if (!chartRef.current) {
      toast.error("Chart is not ready");
      return;
    }

    try {
      await chartRef.current.exportAsPNG("revenue.png");
      toast.success("Chart downloaded as PNG");
    } catch {
      toast.error("Failed to download chart PNG");
    }
  };

  const handleExportSVG = async () => {
    if (!chartRef.current) {
      toast.error("Chart is not ready");
      return;
    }

    try {
      await chartRef.current.exportAsSVG("revenue.svg");
      toast.success("Chart downloaded as SVG");
    } catch {
      toast.error("Failed to download chart SVG");
    }
  };

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
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Core performance indicators for your business.
          </p>
          <Button type="button" onClick={handleExportMetrics} className="gap-2">
            Export Stats
          </Button>
        </div>
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
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              View revenue over the selected timeframe.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              value={revenueTimeframe}
              onChange={(event) =>
                setRevenueTimeframe(
                  event.target.value as "7d" | "30d" | "90d" | "1y"
                )
              }
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-slate-500"
            >
              <option value="7d">7d</option>
              <option value="30d">30d</option>
              <option value="90d">90d</option>
              <option value="1y">1y</option>
            </select>

            <div className="inline-flex rounded-full border border-slate-300 bg-slate-100 p-1 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <button
                type="button"
                onClick={() => setChartType("bar")}
                className={cn(
                  "rounded-full px-3 py-2 text-sm transition",
                  chartType === "bar"
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                    : "hover:bg-slate-200 dark:hover:bg-slate-800"
                )}
              >
                Bar
              </button>
              <button
                type="button"
                onClick={() => setChartType("line")}
                className={cn(
                  "rounded-full px-3 py-2 text-sm transition",
                  chartType === "line"
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                    : "hover:bg-slate-200 dark:hover:bg-slate-800"
                )}
              >
                Line
              </button>
            </div>

            <Button type="button" onClick={handleExportRevenue} className="gap-2">
              Export
            </Button>
            <Button type="button" onClick={handleExportPNG} className="gap-2">
              Export PNG
            </Button>
            <Button type="button" onClick={handleExportSVG} className="gap-2">
              Export SVG
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">Total revenue</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">Average period</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              ${averageRevenue.toLocaleString()}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">Periods</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              {timeframeData.length}
            </p>
          </div>
        </div>

        <RevenueChart
          ref={chartRef}
          data={timeframeData}
          chartType={chartType}
        />
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