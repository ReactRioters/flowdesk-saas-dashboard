import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      {icon && (
        <div className="mb-4 rounded-2xl bg-slate-100 p-3 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          {icon}
        </div>
      )}

      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}