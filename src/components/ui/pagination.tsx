type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="mt-6 flex items-center justify-end gap-2 px-6 pb-6">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm disabled:opacity-50 dark:border-slate-700"
            >
                Previous
            </button>

            <span className="text-sm text-slate-600 dark:text-slate-400">
                Page {currentPage} of {totalPages}
            </span>

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm disabled:opacity-50 dark:border-slate-700"
            >
                Next
            </button>
        </div>
    );
}