export type DashboardStat = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: "revenue" | "users" | "subscriptions" | "churn";
};

export async function getDashboardStats(): Promise<DashboardStat[]> {
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