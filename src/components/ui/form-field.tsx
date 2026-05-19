import type { ReactNode } from "react";

type FormFieldProps = {
    label: string;
    error?: string;
    children: ReactNode;
};

export function FormField({ label, error, children }: FormFieldProps) {
    return (
        <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {label}
            </label>

            <div className="mt-2">{children}</div>

            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}