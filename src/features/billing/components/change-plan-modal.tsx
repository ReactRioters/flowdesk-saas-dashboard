import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../../../components/ui/button";
import { Modal } from "../../../components/ui/modal";
import { Select } from "../../../components/ui/select";
import type { Subscription } from "../../../services/billing-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type ChangePlanModalProps = {
  open: boolean;
  subscription: Subscription | null;
  onClose: () => void;
  onSave: (subscription: Subscription) => void;
  isLoading: boolean;
};

const changePlanSchema = z.object({
  plan: z.enum(["Free", "Starter", "Pro", "Business"]),
});

type ChangePlanFormValues = z.infer<typeof changePlanSchema>;

const planAmounts: Record<Subscription["plan"], string> = {
  Free: "$0/mo",
  Starter: "$19/mo",
  Pro: "$49/mo",
  Business: "$99/mo",
};

export function ChangePlanModal({
  open,
  subscription,
  onClose,
  onSave,
  isLoading,
}: ChangePlanModalProps & { isLoading: boolean }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePlanFormValues>({
    resolver: zodResolver(changePlanSchema),
  });

  useEffect(() => {
    if (subscription) {
      reset({
        plan: subscription.plan,
      });
    }
  }, [subscription, reset]);

  const onSubmit = (values: ChangePlanFormValues) => {
    if (!subscription) return;

    onSave({
      ...subscription,
      plan: values.plan,
      amount: planAmounts[values.plan],
    });
  };

  if (!subscription) return null;

  return (
    <Modal open={open} title="Change Plan" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Change plan for{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {subscription.customerName}
            </span>
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Plan
          </label>

          <Select {...register("plan")} className="mt-2 w-full">
            <option value="Free">Free</option>
            <option value="Starter">Starter</option>
            <option value="Pro">Pro</option>
            <option value="Business">Business</option>
          </Select>
          {errors.plan && (
            <p className="mt-1 text-sm text-red-500">
              {errors.plan.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            onClick={onClose}
            className="bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-800 dark:text-white"
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}