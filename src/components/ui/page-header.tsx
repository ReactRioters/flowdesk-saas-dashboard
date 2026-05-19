type PageHeaderProps = {
    title: string;
    description?: string;
};

export function PageHeader({
    title,
    description,
}: PageHeaderProps) {
    return (
        <div>
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