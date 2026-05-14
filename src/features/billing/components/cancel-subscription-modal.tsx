import { Button } from "../../../components/ui/button";
import { Modal } from "../../../components/ui/modal";
import type { Subscription } from "../../../services/billing-service";

type CancelSubscriptionModalProps = {
  open: boolean;
  subscription: Subscription | null;
  onClose: () => void;
  onConfirm: (subscription: Subscription) => void;
  isLoading: boolean;
};

export function CancelSubscriptionModal({
  open,
  subscription,
  onClose,
  onConfirm,
  isLoading,
}: CancelSubscriptionModalProps & { isLoading: boolean }) {
  if (!subscription) return null;

  return (
    <Modal
      open={open}
      title="Cancel Subscription"
      onClose={onClose}
    >
      <div className="space-y-5">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Are you sure you want to cancel{" "}
          <span className="font-semibold text-slate-900 dark:text-white">
            {subscription.customerName}
          </span>
          's subscription?
        </p>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            onClick={onClose}
            className="bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-800 dark:text-white"
          >
            Keep Subscription
          </Button>

          <Button
            type="button"
            onClick={() => onConfirm(subscription)}
            className="bg-red-600 text-white hover:bg-red-700"
            disabled={isLoading}
          >
            {isLoading ? "Cancelling..." : "Cancel Subscription"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}