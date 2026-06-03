import { Search, Plus, FileDown } from "lucide-react";

import { Input } from "../../../components/ui/input";
import { Select } from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../utils/cn";

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
    exportLoading?: boolean;
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
    exportLoading,
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
                    <Button type="button" variant="secondary" onClick={onResetFilters} className="gap-2">
                        Clear
                    </Button>
                )}
                {onExport && (
                    <Button type="button" onClick={onExport} disabled={exportLoading} className="gap-2">
                        <FileDown className={cn("h-4 w-4", exportLoading && "animate-bounce")} />
                        {exportLoading ? "Exporting..." : "Export"}
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