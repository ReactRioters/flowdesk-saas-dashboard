import { Search, Download } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Select } from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";

type SubscriptionsToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  planFilter: string;
  onPlanFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  hasActiveFilters: boolean;
  resetFilters: () => void;
  onExport?: () => void;
};

export function SubscriptionsToolbar({
  search,
  onSearchChange,
  planFilter,
  onPlanFilterChange,
  statusFilter,
  onStatusFilterChange,
  hasActiveFilters,
  resetFilters,
  onExport,
}: SubscriptionsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative max-w-sm flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search subscriptions..."
          className="pl-10"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Select
          value={planFilter}
          onChange={(event) => onPlanFilterChange(event.target.value)}
        >
          <option value="all">All plans</option>
          <option value="Free">Free</option>
          <option value="Starter">Starter</option>
          <option value="Pro">Pro</option>
          <option value="Business">Business</option>
        </Select>

        <Select
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
        >
          <option value="all">All status</option>
          <option value="Active">Active</option>
          <option value="Trial">Trial</option>
          <option value="Cancelled">Cancelled</option>
        </Select>
        {hasActiveFilters && (
          <Button type="button" variant="secondary" onClick={resetFilters} className="gap-2">
            Reset Filters
          </Button>
        )}

        {onExport && (
          <Button type="button" onClick={onExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        )}
      </div>
    </div>
  );
}