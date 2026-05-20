import {
    CreditCard,
    Shield,
    UserPlus,
} from "lucide-react";

const activities = [
    {
        id: "1",
        title: "New user joined",
        description:
            "Priya Sharma joined the workspace.",
        time: "5 min ago",
        icon: UserPlus,
    },
    {
        id: "2",
        title: "Subscription upgraded",
        description:
            "Michael Chen upgraded to Business plan.",
        time: "22 min ago",
        icon: CreditCard,
    },
    {
        id: "3",
        title: "Password updated",
        description:
            "Security credentials updated successfully.",
        time: "1 hour ago",
        icon: Shield,
    },
];

export function ActivityFeed() {
    return (
        <div className="space-y-4">
            {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                    <div
                        key={activity.id}
                        className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {activity.title}
                                </h3>

                                <span className="shrink-0 text-xs text-slate-500 dark:text-slate-400">
                                    {activity.time}
                                </span>
                            </div>

                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                {activity.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}