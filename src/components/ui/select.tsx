import type { SelectHTMLAttributes } from "react";

import { cn } from "../../utils/cn";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({
  className,
  children,
  ...props
}: SelectProps) {
  return (
    <select
      className={cn(
        "rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}