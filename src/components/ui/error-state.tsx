type ErrorStateProps = {
    title?: string;
    description?: string;
};

export function ErrorState({
    title = "Something went wrong",
    description = "Unable to load data at the moment.",
}: ErrorStateProps) {
    return (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/40 dark:bg-red-950/20">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                {title}
            </h3>

            <p className="mt-2 text-sm text-red-500 dark:text-red-300">
                {description}
            </p>
        </div>
    );
}