import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteUser, getUsers, updateUser, type User } from "../../../services/users-service";
import { UsersTableSkeleton } from "../components/users-table-skeleton";
import { EmptyState } from "../../../components/ui/empty-state";
import { Users } from "lucide-react";
import { UsersTable } from "../components/users-table";
import { UsersToolbar } from "../components/users-toolbar";
import { useUsersFilter } from "../hooks/use-users-filter";
import { Pagination } from "../../../components/ui/pagination";
import { ErrorState } from "../../../components/ui/error-state";
import { useEffect, useState } from "react";
import { EditUserModal } from "../components/edit-user-modal";
import { DeleteUserModal } from "../components/delete-user-modal";
import { toast } from "sonner";
import { PageHeader } from "../../../components/ui/page-header";

export function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const [localUsers, setLocalUsers] =
    useState(users);
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
  } = useUsersFilter(localUsers);
  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      setLocalUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );

      setSelectedUser(null);
      toast.success("User updated successfully");
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (deletedUserId) => {
      setLocalUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== deletedUserId)
      );

      setUserToDelete(null);
      toast.success("User deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  const handleUpdateUser = (updatedUser: User) => {
    updateUserMutation.mutate(updatedUser);
  };

  const handleDeleteUser = (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage users, roles, and account status."
      />
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
            <UsersTable
              users={paginatedUsers}
              onEditUser={setSelectedUser}
              onDeleteUser={setUserToDelete} />
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
      <EditUserModal
        open={!!selectedUser}
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onSave={handleUpdateUser}
        isLoading={updateUserMutation.isPending}
      />
      <DeleteUserModal
        open={!!userToDelete}
        user={userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteUser}
        isLoading={deleteUserMutation.isPending}
      />
    </div>
  );
}