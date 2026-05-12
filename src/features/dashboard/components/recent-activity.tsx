const activities = [
  {
    user: "Sarah Johnson",
    action: "upgraded to Pro plan",
    time: "2 minutes ago",
  },
  {
    user: "Michael Chen",
    action: "created a new workspace",
    time: "18 minutes ago",
  },
  {
    user: "Priya Sharma",
    action: "invited 4 team members",
    time: "1 hour ago",
  },
  {
    user: "Alex Morgan",
    action: "cancelled subscription",
    time: "3 hours ago",
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={`${activity.user}-${activity.time}`}
          className="flex items-start justify-between gap-4 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 p-4"
        >
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {activity.user}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {activity.action}
            </p>
          </div>

          <span className="shrink-0 text-xs text-slate-500 dark:text-slate-400">
            {activity.time}
          </span>
        </div>
      ))}
    </div>
  );
}