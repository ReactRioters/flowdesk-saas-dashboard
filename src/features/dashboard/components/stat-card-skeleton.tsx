import { Skeleton } from "../../../components/ui/skeleton";

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
        </div>

        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>

      <Skeleton className="mt-4 h-4 w-40" />
    </div>
  );
}