import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
    title: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
};

export function PageHeader({
    title,
    description,
    breadcrumbs,
}: PageHeaderProps) {
    return (
        <div>
            {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="mb-4 flex items-center gap-2 text-sm">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {crumb.href ? (
                                <a
                                    href={crumb.href}
                                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                                >
                                    {crumb.label}
                                </a>
                            ) : (
                                <span className="text-slate-900 font-medium dark:text-white">
                                    {crumb.label}
                                </span>
                            )}
                            {index < breadcrumbs.length - 1 && (
                                <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600" />
                            )}
                        </div>
                    ))}
                </div>
            )}
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {title}
            </h1>

            {description && (
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {description}
                </p>
            )}
        </div>
    );
}