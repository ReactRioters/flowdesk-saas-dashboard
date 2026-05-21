import { BarChart3 } from "lucide-react";

type ChartEmptyStateProps = {
    title?: string;
    description?: string;
};

export function ChartEmptyState({
    title = "No analytics data",
    description = "Data will appear here once analytics become available.",
}: ChartEmptyStateProps) {
    return (
        <div className="flex h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <BarChart3 className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                {title}
            </h3>

            <p className="mt-2 max-w-sm text-center text-sm text-slate-600 dark:text-slate-400">
                {description}
            </p>
        </div>
    );
}