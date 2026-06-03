import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers, updateUser, createUser, type User } from "../../../services/users-service";
import { AddUserModal } from "../components/add-user-modal";
import { UsersTableSkeleton } from "../components/users-table-skeleton";
import { EmptyState } from "../../../components/ui/empty-state";
import { Users } from "lucide-react";
import { UsersTable } from "../components/users-table";
import { UsersToolbar } from "../components/users-toolbar";
import { useUsersFilter } from "../hooks/use-users-filter";
import { Pagination } from "../../../components/ui/pagination";
import { ErrorState } from "../../../components/ui/error-state";
import { useState } from "react";
import { downloadCSV } from "../../../utils/download-csv";
import { EditUserModal } from "../components/edit-user-modal";
import { DeleteUserModal } from "../components/delete-user-modal";
import { toast } from "sonner";
import { PageHeader } from "../../../components/ui/page-header";

export function UsersPage() {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
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

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<User[]>(["users"], (prevUsers) =>
        prevUsers?.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        ) ?? []
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
      queryClient.setQueryData<User[]>(["users"], (prevUsers) =>
        prevUsers?.filter((user) => user.id !== deletedUserId) ?? []
      );

      setUserToDelete(null);
      toast.success("User deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData<User[]>(["users"], (prevUsers) =>
        prevUsers ? [newUser, ...prevUsers] : [newUser]
      );
      setIsCreateOpen(false);
      toast.success("User created successfully");
    },
    onError: () => {
      toast.error("Failed to create user");
    },
  });

  const handleCreateUser = (newUser: Omit<User, "id">) => {
    createUserMutation.mutate(newUser);
  };

  const handleUpdateUser = (updatedUser: User) => {
    updateUserMutation.mutate(updatedUser);
  };

  const handleDeleteUser = (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  const handleExport = async () => {
    setExportLoading(true);
    try {
      const rows = filteredUsers.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        status: u.status,
        plan: u.plan,
      }));

      if (rows.length === 0) {
        toast.error("No users to export");
        return;
      }

      downloadCSV("users.csv", rows, [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "role", label: "Role" },
      { key: "status", label: "Status" },
      { key: "plan", label: "Plan" },
      ]);
      toast.success("Users exported successfully");
    } catch {
      toast.error("Failed to export users");
    } finally {
      setExportLoading(false);
    }
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
        onAddUser={() => setIsCreateOpen(true)}
        onExport={handleExport}
        exportLoading={exportLoading}
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
                description={
                  hasActiveFilters
                    ? "Try resetting your filters or searching again."
                    : "Try adjusting your search or filter criteria."
                }
                actionLabel={hasActiveFilters ? "Reset filters" : undefined}
                onAction={hasActiveFilters ? resetFilters : undefined}
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
      <AddUserModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreateUser}
        isLoading={createUserMutation.isPending}
      />
    </div>
  );
}