import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartEmptyState } from "../../../components/ui/chart-empty-state";

type RevenueChartProps = {
  data: {
    label: string;
    revenue: number;
  }[];
  chartType?: "bar" | "line";
};


export function RevenueChart({ data, chartType = "bar" }: RevenueChartProps) {
  if (!data.length) {
    return (
      <ChartEmptyState
        title="No revenue data"
        description="Revenue analytics will appear once transactions are available."
      />
    );
  }
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <div className="relative h-full w-full">
          <div
            aria-hidden={chartType !== "line"}
            className={`absolute inset-0 transition-opacity duration-300 ease-in-out transform origin-center ${
              chartType === "line" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#334155"
                opacity={0.15}
              />

              <XAxis dataKey="label" />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </div>

          <div
            aria-hidden={chartType !== "bar"}
            className={`absolute inset-0 transition-opacity duration-300 ease-in-out transform origin-center ${
              chartType === "bar" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#334155"
                opacity={0.15}
              />

              <XAxis dataKey="label" />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />

              <Tooltip />

              <Bar
                dataKey="revenue"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
}