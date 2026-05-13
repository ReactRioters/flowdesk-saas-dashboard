import { StatusBadge } from "../../../components/ui/status-badge";
import type { User } from "../../../services/users-service";

type UsersTableProps = {
  users: User[];
};

export function UsersTable({ users }: UsersTableProps) {
  return (
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
  );
}