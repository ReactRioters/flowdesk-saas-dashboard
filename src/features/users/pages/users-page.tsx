const users = [
  {
    name: "Sarah Johnson",
    email: "sarah@flowdesk.com",
    role: "Admin",
    status: "Active",
    plan: "Pro",
  },
  {
    name: "Michael Chen",
    email: "michael@flowdesk.com",
    role: "Manager",
    status: "Active",
    plan: "Business",
  },
  {
    name: "Priya Sharma",
    email: "priya@flowdesk.com",
    role: "Member",
    status: "Pending",
    plan: "Starter",
  },
  {
    name: "Alex Morgan",
    email: "alex@flowdesk.com",
    role: "Member",
    status: "Inactive",
    plan: "Free",
  },
];

export function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage users, roles, subscription plans, and account status.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">User Management</h2>
          <p className="mt-1 text-sm text-slate-400">
            View and manage workspace members.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-950 text-slate-400">
              <tr>
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Plan</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {users.map((user) => (
                <tr key={user.email} className="hover:bg-slate-800/50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="mt-1 text-slate-400">{user.email}</p>
                  </td>

                  <td className="px-6 py-4 text-slate-300">{user.role}</td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-300">{user.plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}