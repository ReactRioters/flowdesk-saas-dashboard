import {
  CreditCard,
  DollarSign,
  TrendingDown,
  Users,
} from "lucide-react";
import { useState, useRef, type KeyboardEvent } from "react";
import { useQuery } from "@tanstack/react-query";

import { SectionCard } from "../../../components/ui/section-card";
import { getDashboardStats, getRevenueData } from "../../../services/dashboard-service";
import { StatCard } from "../components/stat-card";
import { RecentActivity } from "../components/recent-activity";
import { RevenueChart } from "../components/revenue-chart";
import type { RevenueChartHandle } from "../components/revenue-chart";
import { StatCardSkeleton } from "../components/stat-card-skeleton";
import { PageHeader } from "../../../components/ui/page-header";
import { Skeleton } from "../../../components/ui/skeleton";
import { Button } from "../../../components/ui/button";
import { Modal } from "../../../components/ui/modal";
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
    isError: isRevenueError,
    refetch: refetchRevenue,
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
    if (!timeframeData.length) return;

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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewType, setPreviewType] = useState<"png" | "svg">("png");
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewFileName, setPreviewFileName] = useState("revenue.png");
  const [previewLoading, setPreviewLoading] = useState(false);

  const handleRetryRevenue = async () => {
    if (!refetchRevenue) return;

    try {
      await refetchRevenue();
      toast.success("Retrying revenue fetch");
    } catch {
      toast.error("Retry failed");
    }
  };

  const handlePreview = async (type: "png" | "svg") => {
    if (!chartRef.current) {
      toast.error("Chart is not ready");
      return;
    }

    setPreviewLoading(true);
    setPreviewType(type);
    setPreviewFileName(type === "png" ? "revenue.png" : "revenue.svg");

    try {
      const url = await chartRef.current.getExportPreview(type);
      if (!url) {
        toast.error("Unable to generate preview");
        return;
      }
      setPreviewUrl(url);
      setPreviewOpen(true);
    } catch {
      toast.error("Failed to generate preview");
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleDownloadPreview = () => {
    if (!previewUrl) return;

    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = previewFileName;
    a.click();
  };

  const handleChartTypeKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key.toLowerCase() === "b") {
      setChartType("bar");
      return;
    }

    if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key.toLowerCase() === "l") {
      setChartType("line");
      return;
    }
  };

  const handleTimeframeKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "1") setRevenueTimeframe("7d");
    if (e.key === "2") setRevenueTimeframe("30d");
    if (e.key === "3") setRevenueTimeframe("90d");
    if (e.key === "4") setRevenueTimeframe("1y");
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
              aria-label="Select revenue timeframe"
              value={revenueTimeframe}
              onChange={(event) =>
                setRevenueTimeframe(
                  event.target.value as "7d" | "30d" | "90d" | "1y"
                )
              }
              onKeyDown={handleTimeframeKeyDown}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-slate-500"
            >
              <option value="7d">7d</option>
              <option value="30d">30d</option>
              <option value="90d">90d</option>
              <option value="1y">1y</option>
            </select>

            <div role="toolbar" aria-label="Chart type" className="inline-flex rounded-full border border-slate-300 bg-slate-100 p-1 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <button
                type="button"
                aria-label="Bar chart"
                aria-pressed={chartType === "bar"}
                onClick={() => setChartType("bar")}
                onKeyDown={handleChartTypeKeyDown}
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
                aria-label="Line chart"
                aria-pressed={chartType === "line"}
                onClick={() => setChartType("line")}
                onKeyDown={handleChartTypeKeyDown}
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

            <Button type="button" onClick={handleExportRevenue} disabled={isRevenueLoading} className="gap-2">
              Export
            </Button>
            <Button type="button" onClick={() => handlePreview("png")} disabled={isRevenueLoading} className="gap-2">
              Preview PNG
            </Button>
            <Button type="button" onClick={() => handlePreview("svg")} disabled={isRevenueLoading} className="gap-2">
              Preview SVG
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

        {isRevenueLoading && !timeframeData.length ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <Skeleton className="h-[320px] w-full" />
          </div>
        ) : isRevenueError ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            <p>Unable to load revenue data. Please try again.</p>
            <div className="mt-4 flex items-center justify-center">
              <Button type="button" onClick={handleRetryRevenue} disabled={isRevenueLoading}>
                Retry
              </Button>
            </div>
          </div>
        ) : (
          <RevenueChart
            ref={chartRef}
            data={timeframeData}
            chartType={chartType}
          />
        )}
      </SectionCard>

      <Modal open={previewOpen} title={`Preview ${previewType.toUpperCase()}`} onClose={() => setPreviewOpen(false)}>
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            {previewLoading ? (
              <div className="flex h-80 items-center justify-center text-slate-500 dark:text-slate-400">
                Generating preview...
              </div>
            ) : previewUrl ? (
              <img
                src={previewUrl}
                alt={`Preview of exported ${previewType.toUpperCase()}`}
                className="mx-auto max-h-[320px] w-full object-contain"
              />
            ) : (
              <div className="flex h-80 items-center justify-center text-slate-500 dark:text-slate-400">
                Preview unavailable.
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              onClick={handleDownloadPreview}
              disabled={!previewUrl}
              className="gap-2"
            >
              Download {previewType.toUpperCase()}
            </Button>
            <Button
              type="button"
              onClick={() => setPreviewOpen(false)}
              className="bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>

      <SectionCard
        title="Recent Activity"
        description="Latest user and subscription activity across the platform."
      >
        <RecentActivity />
      </SectionCard>
    </div>
  );
}