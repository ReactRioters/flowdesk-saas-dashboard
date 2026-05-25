import { Search, Plus, Download, LayoutGrid, List } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Select } from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../utils/cn";

type ProjectsToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  sortOrder:
    | "name-asc"
    | "name-desc"
    | "dueDate-asc"
    | "dueDate-desc"
    | "progress-asc"
    | "progress-desc";
  onSortOrderChange: (
    value:
      | "name-asc"
      | "name-desc"
      | "dueDate-asc"
      | "dueDate-desc"
      | "progress-asc"
      | "progress-desc"
  ) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  onCreateProject: () => void;
  onExport?: () => void;
  viewMode: "grid" | "list";
  onViewModeChange: (value: "grid" | "list") => void;
};

export function ProjectsToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortOrder,
  onSortOrderChange,
  onResetFilters,
  hasActiveFilters,
  onCreateProject,
  onExport,
  viewMode,
  onViewModeChange,
}: ProjectsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative max-w-sm flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects..."
          className="pl-10"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </Select>

        <Select
          value={sortOrder}
          onChange={(e) =>
            onSortOrderChange(
              e.target.value as
                | "name-asc"
                | "name-desc"
                | "dueDate-asc"
                | "dueDate-desc"
                | "progress-asc"
                | "progress-desc"
            )
          }
        >
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="dueDate-asc">Due Date Soonest</option>
          <option value="dueDate-desc">Due Date Latest</option>
          <option value="progress-asc">Progress Low-High</option>
          <option value="progress-desc">Progress High-Low</option>
        </Select>

        <div className="inline-flex overflow-hidden rounded-full border border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm transition",
              viewMode === "grid"
                ? "bg-white text-slate-900 dark:bg-slate-800 dark:text-white"
                : "hover:bg-slate-200 dark:hover:bg-slate-800"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
            Grid
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm transition",
              viewMode === "list"
                ? "bg-white text-slate-900 dark:bg-slate-800 dark:text-white"
                : "hover:bg-slate-200 dark:hover:bg-slate-800"
            )}
          >
            <List className="h-4 w-4" />
            List
          </button>
        </div>

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

        <Button type="button" onClick={onCreateProject} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>
    </div>
  );
}
