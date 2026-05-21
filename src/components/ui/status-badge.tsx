import { cn } from "../../utils/cn";

type StatusBadgeProps = {
  status: "Active" | "Pending" | "Inactive" | "Trial" | "Cancelled" | "Completed" | "On Hold";
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles = {
    Active: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400",
    Pending: "bg-amber-500/10 text-amber-600 ring-amber-500/20 dark:text-amber-400",
    Inactive: "bg-red-500/10 text-red-600 ring-red-500/20 dark:text-red-400",
    Trial: "bg-blue-500/10 text-blue-600 ring-blue-500/20 dark:text-blue-400",
    Cancelled: "bg-gray-500/10 text-gray-600 ring-gray-500/20 dark:text-gray-400",
    Completed: "bg-indigo-500/10 text-indigo-600 ring-indigo-500/20 dark:text-indigo-400",
    "On Hold": "bg-amber-500/10 text-amber-600 ring-amber-500/20 dark:text-amber-400",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1",
        statusStyles[status]
      )}
    >
      {status}
    </span>
  );
}