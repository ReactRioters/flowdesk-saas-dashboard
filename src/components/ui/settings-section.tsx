import type { ReactNode } from "react";

type SettingsSectionProps = {
    title: string;
    description?: string;
    children: ReactNode;
};

export function SettingsSection({
    title,
    description,
    children,
}: SettingsSectionProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {title}
                </h2>

                {description && (
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {description}
                    </p>
                )}
            </div>

            {children}
        </div>
    );
}