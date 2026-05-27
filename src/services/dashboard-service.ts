export type DashboardStat = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: "revenue" | "users" | "subscriptions" | "churn";
};

export async function getDashboardStats(): Promise<DashboardStat[]> {
   // fake dealay to simulate network request
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Promise.resolve([
    {
      title: "Total Revenue",
      value: "$48,240",
      change: "+12.5% from last month",
      changeType: "positive",
      icon: "revenue",
    },
    {
      title: "Active Users",
      value: "12,450",
      change: "+8.2% from last month",
      changeType: "positive",
      icon: "users",
    },
    {
      title: "Subscriptions",
      value: "2,430",
      change: "+5.1% from last month",
      changeType: "positive",
      icon: "subscriptions",
    },
    {
      title: "Churn Rate",
      value: "2.4%",
      change: "-0.8% from last month",
      changeType: "negative",
      icon: "churn",
    },
  ]);
}

export type RevenuePoint = { label: string; revenue: number };

export async function getRevenueData(timeframe: "7d" | "30d" | "90d" | "1y"): Promise<RevenuePoint[]> {
  // simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  const data: Record<string, RevenuePoint[]> = {
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

  return Promise.resolve(data[timeframe]);
}