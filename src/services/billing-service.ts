export type SubscriptionStatus = "Active" | "Trial" | "Cancelled";

export type Subscription = {
  id: string;
  customerName: string;
  email: string;
  plan: "Free" | "Starter" | "Pro" | "Business";
  status: SubscriptionStatus;
  amount: string;
  renewalDate: string;
};

export async function getSubscriptions(): Promise<Subscription[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return [
    {
      id: "sub_1",
      customerName: "Sarah Johnson",
      email: "sarah@flowdesk.com",
      plan: "Pro",
      status: "Active",
      amount: "$49/mo",
      renewalDate: "2026-06-12",
    },
    {
      id: "sub_2",
      customerName: "Michael Chen",
      email: "michael@flowdesk.com",
      plan: "Business",
      status: "Active",
      amount: "$99/mo",
      renewalDate: "2026-06-18",
    },
    {
      id: "sub_3",
      customerName: "Priya Sharma",
      email: "priya@flowdesk.com",
      plan: "Starter",
      status: "Trial",
      amount: "$19/mo",
      renewalDate: "2026-05-28",
    },
    {
      id: "sub_4",
      customerName: "Alex Morgan",
      email: "alex@flowdesk.com",
      plan: "Free",
      status: "Cancelled",
      amount: "$0/mo",
      renewalDate: "—",
    },
    {
      id: "sub_5",
      customerName: "Emily Davis",
      email: "emily@flowdesk.com",
      plan: "Pro",
      status: "Active",
      amount: "$49/mo",
      renewalDate: "2026-06-15",
    },
    {
      id: "sub_6",
      customerName: "David Lee",
      email: "david@flowdesk.com",
      plan: "Starter",
      status: "Trial",
      amount: "$19/mo",
      renewalDate: "2026-05-30",
    }
  ];
}

export async function updateSubscription(
  subscription: Subscription
): Promise<Subscription> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return subscription;
}

export async function cancelSubscription(
  subscription: Subscription
): Promise<Subscription> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    ...subscription,
    status: "Cancelled",
    amount: "$0/mo",
  };
}