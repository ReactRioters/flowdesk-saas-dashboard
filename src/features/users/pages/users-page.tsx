import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../services/users-service";
import { UsersTableSkeleton } from "../components/users-table-skeleton";
import { EmptyState } from "../../../components/ui/empty-state";
import { Users } from "lucide-react";
import { UsersTable } from "../components/users-table";
import { UsersToolbar } from "../components/users-toolbar";
import { useUsersFilter } from "../hooks/use-users-filter";
import { Pagination } from "../../../components/ui/pagination";
import { ErrorState } from "../../../components/ui/error-state";

export function UsersPage() {

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const {
    search,
    setSearch,

    roleFilter,
    setRoleFilter,

    statusFilter,
    setStatusFilter,

    sortOrder,
    setSortOrder,
filteredUsers,
    paginatedUsers,
    currentPage,
    totalPages,
    setCurrentPage,
    resetFilters,
    hasActiveFilters
  } = useUsersFilter(users);

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
      <UsersToolbar
        search={search}
        onSearchChange={setSearch}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortOrder={sortOrder}
        onResetFilters={resetFilters}
        onSortOrderChange={setSortOrder}
        hasActiveFilters={hasActiveFilters}
      />
<p className="text-sm text-slate-600 dark:text-slate-400">
  Showing {paginatedUsers.length} of {filteredUsers.length} users
</p>
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
          ) : isError ? (
            <div className="p-6">
              <ErrorState
                title="Failed to load users"
                description="Please refresh the page or try again later."
              />
            </div>) : paginatedUsers.length === 0 ? (
              <EmptyState
                icon={<Users className="h-6 w-6" />}
                title="No users found"
                description="Try adjusting your search or filter criteria."
              />
            ) : (
            <UsersTable users={paginatedUsers} />
          )}
          {!isLoading && paginatedUsers.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}