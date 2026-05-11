import type { LucideIcon } from "lucide-react";
import { cn } from "../../../utils/cn";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
};

export function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-white">{value}</h3>
        </div>

        <div className="rounded-xl bg-slate-800 p-2 text-slate-300">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <p
        className={cn(
          "mt-4 text-sm",
          changeType === "positive" ? "text-emerald-400" : "text-red-400"
        )}
      >
        {change}
      </p>
    </div>
  );
}