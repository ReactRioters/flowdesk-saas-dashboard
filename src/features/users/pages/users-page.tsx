import { useQuery } from "@tanstack/react-query";

import { StatusBadge } from "../../../components/ui/status-badge";
import { getUsers } from "../../../services/users-service";
import { UsersTableSkeleton } from "../components/users-table-skeleton";

export function UsersPage() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Users
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Manage users, roles, subscription plans, and account status.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            User Management
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            View and manage workspace members.
          </p>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <UsersTableSkeleton />
          ) : (
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3 font-medium">User</th>
                  <th className="px-6 py-3 font-medium">Role</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Plan</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="mt-1 text-slate-600 dark:text-slate-400">
                        {user.email}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      {user.role}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={user.status} />
                    </td>

                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      {user.plan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}