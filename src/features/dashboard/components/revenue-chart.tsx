import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18500 },
  { month: "Mar", revenue: 14200 },
  { month: "Apr", revenue: 22800 },
  { month: "May", revenue: 26400 },
  { month: "Jun", revenue: 31200 },
];

export function RevenueChart() {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#334155"
            opacity={0.15}
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />

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