import { StatusBadge } from "../../../components/ui/status-badge";
import type { Subscription } from "../../../services/billing-service";
import { SubscriptionRowActions } from "./subscription-row-actions";

type SubscriptionsTableProps = {
  subscriptions: Subscription[];
  onChangePlan: (subscription: Subscription) => void;
  onCancelSubscription: (subscription: Subscription) => void;
};

export function SubscriptionsTable({
  subscriptions,
  onChangePlan,
  onCancelSubscription,
}: SubscriptionsTableProps) {
  return (
    <table className="w-full min-w-[920px] text-left text-sm">
      <thead className="bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-400">
        <tr>
          <th className="px-6 py-3 font-medium">Customer</th>
          <th className="px-6 py-3 font-medium">Plan</th>
          <th className="px-6 py-3 font-medium">Status</th>
          <th className="px-6 py-3 font-medium">Amount</th>
          <th className="px-6 py-3 font-medium">Renewal Date</th>
          <th className="px-6 py-3 font-medium">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
        {subscriptions.map((subscription) => (
          <tr
            key={subscription.id}
            className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <td className="px-6 py-4">
              <p className="font-medium text-slate-900 dark:text-white">
                {subscription.customerName}
              </p>

              <p className="mt-1 text-slate-600 dark:text-slate-400">
                {subscription.email}
              </p>
            </td>

            <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
              {subscription.plan}
            </td>

            <td className="px-6 py-4">
              <StatusBadge status={subscription.status} />
            </td>

            <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
              {subscription.amount}
            </td>

            <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
              {subscription.renewalDate}
            </td>

            <td className="px-6 py-4">
              <SubscriptionRowActions
                onChangePlan={() => onChangePlan(subscription)}
                onCancel={() => onCancelSubscription(subscription)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}