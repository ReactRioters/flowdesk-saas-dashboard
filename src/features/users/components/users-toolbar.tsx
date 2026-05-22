import { Search, Plus, Download } from "lucide-react";

import { Input } from "../../../components/ui/input";
import { Select } from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";

type UsersToolbarProps = {
    search: string;
    onSearchChange: (value: string) => void;

    roleFilter: string;
    onRoleFilterChange: (value: string) => void;

    statusFilter: string;
    onStatusFilterChange: (value: string) => void;

    sortOrder: "asc" | "desc";
    onSortOrderChange: (value: "asc" | "desc") => void;
    onResetFilters: () => void;
    hasActiveFilters: boolean;
    onAddUser: () => void;
    onExport?: () => void;
};

export function UsersToolbar({
    search,
    onSearchChange,

    roleFilter,
    onRoleFilterChange,

    statusFilter,
    onStatusFilterChange,

    sortOrder,
    onSortOrderChange,

    onResetFilters,
    hasActiveFilters,
    onAddUser,
    onExport,
}: UsersToolbarProps) {
    return (
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-sm flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <Input
                    value={search}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                    placeholder="Search users..."
                    className="pl-10"
                />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Select
                    value={roleFilter}
                    onChange={(event) =>
                        onRoleFilterChange(event.target.value)
                    }
                >
                    <option value="all">All roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Member">Member</option>
                </Select>

                <Select
                    value={statusFilter}
                    onChange={(event) =>
                        onStatusFilterChange(event.target.value)
                    }
                >
                    <option value="all">All status</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                </Select>

                <Select
                    value={sortOrder}
                    onChange={(event) =>
                        onSortOrderChange(
                            event.target.value as "asc" | "desc"
                        )
                    }
                >
                    <option value="asc">Name A-Z</option>
                    <option value="desc">Name Z-A</option>
                </Select>
                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={onResetFilters}
                        className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        Clear
                    </button>
                )}
                {onExport && (
                    <Button type="button" onClick={onExport} className="gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                )}

                <Button type="button" onClick={onAddUser} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add User
                </Button>
            </div>
        </div>
    );
}