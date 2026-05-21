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
  // fake dealay to simulate network request
  await new Promise((resolve) => setTimeout(resolve, 1000));
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
      {
      id: "5",
      name: "Emily Davis",
      email: "emily@flowdesk.com",
      role: "Manager",
      status: "Active",
      plan: "Pro",
    },
    {
      id: "6",
      name: "David Lee",
      email: "david@flowdesk.com",
      role: "Member",
      status: "Active",
      plan: "Starter",
    },
    {
      id: "7",
      name: "Sophia Martinez",
      email: "sophia@flowdesk.com",
      role: "Member",
      status: "Active",
      plan: "Free",
    },
     {
      id: "8",
      name: "James Wilson",
      email: "james@flowdesk.com",
      role: "Member",
      status: "Active",
      plan: "Pro",
    },
    {
      id: "9",
      name: "Olivia Brown",
      email: "olivia@flowdesk.com",
      role: "Member",
      status: "Active",
      plan: "Starter",
    },
    {
      id: "10",
      name: "Ethan Taylor",
      email: "ethan@flowdesk.com",
      role: "Member",
      status: "Active",
      plan: "Free",
    },
    {
      id: "11",
      name: "Ava Anderson",
      email: "ava@flowdesk.com",
      role: "Member",
      status: "Active",
      plan: "Pro",
    }
  ]);
}

export async function updateUser(user: User): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return user;
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    ...user,
    id: Math.random().toString(36).substr(2, 9),
  };
}

export async function deleteUser(userId: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return userId;
}