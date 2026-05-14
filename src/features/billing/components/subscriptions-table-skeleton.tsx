import { Skeleton } from "../../../components/ui/skeleton";

export function SubscriptionsTableSkeleton() {
  return (
    <table className="w-full min-w-[820px] text-left text-sm">
      <thead className="bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-400">
        <tr>
          <th className="px-6 py-3 font-medium">Customer</th>
          <th className="px-6 py-3 font-medium">Plan</th>
          <th className="px-6 py-3 font-medium">Status</th>
          <th className="px-6 py-3 font-medium">Amount</th>
          <th className="px-6 py-3 font-medium">Renewal Date</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
        {Array.from({ length: 5 }).map((_, index) => (
          <tr key={index}>
            <td className="px-6 py-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="mt-2 h-3 w-48" />
            </td>

            <td className="px-6 py-4">
              <Skeleton className="h-4 w-20" />
            </td>

            <td className="px-6 py-4">
              <Skeleton className="h-6 w-24 rounded-full" />
            </td>

            <td className="px-6 py-4">
              <Skeleton className="h-4 w-16" />
            </td>

            <td className="px-6 py-4">
              <Skeleton className="h-4 w-24" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}