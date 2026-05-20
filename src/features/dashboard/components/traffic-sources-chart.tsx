import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const trafficData = [
  { name: "Organic", value: 42 },
  { name: "Direct", value: 28 },
  { name: "Referral", value: 18 },
  { name: "Social", value: 12 },
];

export function TrafficSourcesChart() {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={trafficData}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={4}
          >
            {trafficData.map((entry) => (
              <Cell key={entry.name} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}