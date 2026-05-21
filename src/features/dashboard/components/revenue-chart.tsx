import {
  Bar,
  BarChart,
  CartesianGrid,
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
};


export function RevenueChart({ data }: RevenueChartProps) {
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
      </ResponsiveContainer>
    </div>
  );
}