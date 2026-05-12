export type UserStatus = "Active" | "Pending" | "Inactive";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Member";
  status: UserStatus;
  plan: "Free" | "Starter" | "Pro" | "Business";
};

export async function getUsers(): Promise<User[]> {
  return Promise.resolve([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@flowdesk.com",
      role: "Admin",
      status: "Active",
      plan: "Pro",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael@flowdesk.com",
      role: "Manager",
      status: "Active",
      plan: "Business",
    },
    {
      id: "3",
      name: "Priya Sharma",
      email: "priya@flowdesk.com",
      role: "Member",
      status: "Pending",
      plan: "Starter",
    },
    {
      id: "4",
      name: "Alex Morgan",
      email: "alex@flowdesk.com",
      role: "Member",
      status: "Inactive",
      plan: "Free",
    },
  ]);
}