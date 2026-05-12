import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 36000 },
  { month: "Mar", revenue: 34000 },
  { month: "Apr", revenue: 42000 },
  { month: "May", revenue: 48000 },
  { month: "Jun", revenue: 52000 },
];

export function RevenueChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="revenue" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}