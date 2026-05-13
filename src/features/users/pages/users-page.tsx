import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../services/users-service";
import { UsersTableSkeleton } from "../components/users-table-skeleton";
import { EmptyState } from "../../../components/ui/empty-state";
import { Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "../../../components/ui/input";
import { UsersTable } from "../components/users-table";

export function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<
    "asc" | "desc"
  >("asc");
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const filteredUsers = useMemo(() => {
    const filtered = users.filter((user) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue) ||
        user.role.toLowerCase().includes(searchValue);

      const matchesRole =
        roleFilter === "all" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });

    const sorted = [...filtered].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [users, search, roleFilter, statusFilter, sortOrder]);

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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users..."
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            <option value="all">All roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Member">Member</option>
          </select>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            <option value="all">All status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            value={sortOrder}
            onChange={(event) =>
              setSortOrder(
                event.target.value as "asc" | "desc"
              )
            }
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            <option value="asc">Name A-Z</option>
            <option value="desc">Name Z-A</option>
          </select>
        </div>
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
          ) : filteredUsers.length === 0 ? (
            <EmptyState
              icon={<Users className="h-6 w-6" />}
              title="No users found"
              description="Try adjusting your search or filter criteria."
            />
          ) : (
            <UsersTable users={filteredUsers} />
          )}
        </div>
      </div>
    </div>
  );
}