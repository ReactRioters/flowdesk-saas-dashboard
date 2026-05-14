import { useQuery } from "@tanstack/react-query";
import { CreditCard } from "lucide-react";

import { EmptyState } from "../../../components/ui/empty-state";
import { ErrorState } from "../../../components/ui/error-state";
import { getSubscriptions } from "../../../services/billing-service";
import { SubscriptionsTableSkeleton } from "../components/subscriptions-table-skeleton";
import { SubscriptionsTable } from "../components/subscriptions-table";
import { SubscriptionsToolbar } from "../components/subscriptions-toolbar";
import { useSubscriptionsFilter } from "../hooks/use-subscriptions-filter";
import { Pagination } from "../../../components/ui/pagination";

export function BillingPage() {
  const {
    data: subscriptions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: getSubscriptions,
  });
  const {
    search,
    setSearch,
    planFilter,
    setPlanFilter,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredSubscriptions,
    paginatedSubscriptions,
    hasActiveFilters,
    resetFilters,
  } = useSubscriptionsFilter(subscriptions);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Billing
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Manage customer plans, subscription status, and billing activity.
        </p>
      </div>

      <SubscriptionsToolbar
        search={search}
        onSearchChange={setSearch}
        planFilter={planFilter}
        onPlanFilterChange={setPlanFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        hasActiveFilters={hasActiveFilters}
        resetFilters={resetFilters}
      />

      <p className="text-sm text-slate-600 dark:text-slate-400">
        Showing {paginatedSubscriptions.length} of {filteredSubscriptions.length} subscriptions
      </p>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Subscriptions
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            View active plans and upcoming renewals.
          </p>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <SubscriptionsTableSkeleton />
          ) : isError ? (
            <div className="p-6">
              <ErrorState
                title="Failed to load subscriptions"
                description="Please refresh the page or try again later."
              />
            </div>
          ) : paginatedSubscriptions.length === 0 ? (
            <EmptyState
              icon={<CreditCard className="h-6 w-6" />}
              title="No subscriptions found"
              description="Subscriptions will appear here once customers choose a plan."
            />
          ) : (
            <SubscriptionsTable subscriptions={paginatedSubscriptions} />
          )}
          {!isLoading && paginatedSubscriptions.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}