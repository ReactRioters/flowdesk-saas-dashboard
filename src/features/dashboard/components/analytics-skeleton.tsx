import { Skeleton } from "../../../components/ui/skeleton";

export function AnalyticsSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <Skeleton className="h-8 w-44" />
                    <Skeleton className="mt-2 h-4 w-80" />
                </div>

                <Skeleton className="h-10 w-40" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
                    >
                        <Skeleton className="h-5 w-28" />
                        <Skeleton className="mt-4 h-8 w-24" />
                        <Skeleton className="mt-2 h-4 w-32" />
                    </div>
                ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="mt-2 h-4 w-56" />
                    <Skeleton className="mt-6 h-[260px] w-full" />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="mt-2 h-4 w-56" />
                    <Skeleton className="mt-6 h-[260px] w-full rounded-full" />
                </div>
            </div>
        </div>
    );
}