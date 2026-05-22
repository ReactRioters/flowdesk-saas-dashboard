import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "../../../components/ui/empty-state";
import { ErrorState } from "../../../components/ui/error-state";
import { Pagination } from "../../../components/ui/pagination";
import { downloadCSV } from "../../../utils/download-csv";
import {
  cancelSubscription,
  getSubscriptions,
  updateSubscription,
  type Subscription,
} from "../../../services/billing-service";
import { ChangePlanModal } from "../components/change-plan-modal";
import { SubscriptionsTable } from "../components/subscriptions-table";
import { SubscriptionsTableSkeleton } from "../components/subscriptions-table-skeleton";
import { SubscriptionsToolbar } from "../components/subscriptions-toolbar";
import { useSubscriptionsFilter } from "../hooks/use-subscriptions-filter";
import { CancelSubscriptionModal } from "../components/cancel-subscription-modal";
import { PageHeader } from "../../../components/ui/page-header";

export function BillingPage() {
  const {
    data: subscriptions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: getSubscriptions,
  });

  const [localSubscriptions, setLocalSubscriptions] =
    useState<Subscription[]>(subscriptions);

  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);

  const [
    subscriptionToCancel,
    setSubscriptionToCancel,
  ] = useState<Subscription | null>(null);

  useEffect(() => {
    setLocalSubscriptions(subscriptions);
  }, [subscriptions]);

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
  } = useSubscriptionsFilter(localSubscriptions);

  const updateSubscriptionMutation = useMutation({
    mutationFn: updateSubscription,
    onSuccess: (updatedSubscription) => {
      setLocalSubscriptions((prev) =>
        prev.map((item) =>
          item.id === updatedSubscription.id ? updatedSubscription : item
        )
      );

      setSelectedSubscription(null);
      toast.success("Subscription plan updated successfully");
    },
    onError: () => {
      toast.error("Failed to update subscription plan");
    },
  });

  const cancelSubscriptionMutation = useMutation({
    mutationFn: cancelSubscription,
    onSuccess: (cancelledSubscription) => {
      setLocalSubscriptions((prev) =>
        prev.map((item) =>
          item.id === cancelledSubscription.id ? cancelledSubscription : item
        )
      );

      setSubscriptionToCancel(null);
      toast.success("Subscription cancelled successfully");
    },
    onError: () => {
      toast.error("Failed to cancel subscription");
    },
  });

  const handleChangePlan = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
  };

  const handleSavePlan = (updatedSubscription: Subscription) => {
    updateSubscriptionMutation.mutate(updatedSubscription);
  };

  const handleCancelSubscription = (subscription: Subscription) => {
    setSubscriptionToCancel(subscription);
  };

  const handleConfirmCancelSubscription = (subscription: Subscription) => {
    cancelSubscriptionMutation.mutate(subscription);
  };

  const handleExport = () => {
    const rows = filteredSubscriptions.map((subscription) => ({
      id: subscription.id,
      customerName: subscription.customerName,
      email: subscription.email,
      plan: subscription.plan,
      status: subscription.status,
      renewalDate: subscription.renewalDate,
    }));

    downloadCSV("subscriptions.csv", rows, [
      { key: "id", label: "ID" },
      { key: "customerName", label: "Customer" },
      { key: "email", label: "Email" },
      { key: "plan", label: "Plan" },
      { key: "status", label: "Status" },
      { key: "renewalDate", label: "Renewal Date" },
    ]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing"
        description="Manage customer plans, subscription status, and billing activity."
      />

      <SubscriptionsToolbar
        search={search}
        onSearchChange={setSearch}
        planFilter={planFilter}
        onPlanFilterChange={setPlanFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        hasActiveFilters={hasActiveFilters}
        resetFilters={resetFilters}
        onExport={handleExport}
      />

      <p className="text-sm text-slate-600 dark:text-slate-400">
        Showing {paginatedSubscriptions.length} of{" "}
        {filteredSubscriptions.length} subscriptions
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
              description="Try adjusting your search or filter criteria."
            />
          ) : (
            <SubscriptionsTable
              subscriptions={paginatedSubscriptions}
              onChangePlan={handleChangePlan}
              onCancelSubscription={handleCancelSubscription}
            />
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

      <ChangePlanModal
        open={!!selectedSubscription}
        subscription={selectedSubscription}
        onClose={() => setSelectedSubscription(null)}
        onSave={handleSavePlan}
        isLoading={updateSubscriptionMutation.isPending}
      />
      <CancelSubscriptionModal
        open={!!subscriptionToCancel}
        subscription={subscriptionToCancel}
        onClose={() =>
          setSubscriptionToCancel(null)
        }
        onConfirm={
          handleConfirmCancelSubscription
        }
        isLoading={cancelSubscriptionMutation.isPending}
      />
    </div>
  );
}