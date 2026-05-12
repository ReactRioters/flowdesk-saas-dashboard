import { cn } from "../../utils/cn";

type StatusBadgeProps = {
  status: "Active" | "Pending" | "Inactive";
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles = {
    Active: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    Pending: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
    Inactive: "bg-red-500/10 text-red-400 ring-red-500/20",
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