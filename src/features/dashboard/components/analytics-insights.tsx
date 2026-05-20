import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

const insights = [
    {
        title: "Organic traffic is performing best",
        description: "Organic visitors contribute the highest traffic share this period.",
        icon: TrendingUp,
    },
    {
        title: "Conversion rate improved",
        description: "Conversion improved compared to the previous selected period.",
        icon: CheckCircle2,
    },
    {
        title: "Monitor social acquisition",
        description: "Social traffic is lower than other channels and may need campaign focus.",
        icon: AlertTriangle,
    },
];

export function AnalyticsInsights() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            {insights.map((insight) => {
                const Icon = insight.icon;

                return (
                    <div
                        key={insight.title}
                        className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950"
                    >
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            <Icon className="h-5 w-5" />
                        </div>

                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                            {insight.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            {insight.description}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}