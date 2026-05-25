import { useEffect, useMemo, useState } from "react";
import type { Project } from "../../../services/projects-service";
import { useDebounce } from "../../../hooks/use-debounce";
import { useSearchParams } from "react-router-dom";

export function useProjectsFilter(projects: Project[]) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "all");
  const [sortOrder, setSortOrder] = useState<
    | "name-asc"
    | "name-desc"
    | "dueDate-asc"
    | "dueDate-desc"
    | "progress-asc"
    | "progress-desc"
  >(searchParams.get("sort") === "name-desc" ||
    searchParams.get("sort") === "dueDate-asc" ||
    searchParams.get("sort") === "dueDate-desc" ||
    searchParams.get("sort") === "progress-asc" ||
    searchParams.get("sort") === "progress-desc"
    ? (searchParams.get("sort") as
        | "name-asc"
        | "name-desc"
        | "dueDate-asc"
        | "dueDate-desc"
        | "progress-asc"
        | "progress-desc")
    : "name-asc");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }

    if (statusFilter !== "all") {
      params.set("status", statusFilter);
    }

    if (sortOrder !== "name-asc") {
      params.set("sort", sortOrder);
    }

    if (currentPage > 1) {
      params.set("page", String(currentPage));
    }
    setSearchParams(params);
  }, [search, statusFilter, sortOrder, currentPage, setSearchParams]);

  const itemsPerPage = 6;

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const searchValue = debouncedSearch.toLowerCase();
      const matchesSearch =
        project.name.toLowerCase().includes(searchValue) ||
        project.description.toLowerCase().includes(searchValue);

      const matchesStatus = statusFilter === "all" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    const sorted = [...filtered].sort((a, b) => {
      const [field, direction] = sortOrder.split("-") as [
        "name" | "dueDate" | "progress",
        "asc" | "desc"
      ];

      if (field === "name") {
        const comparison = a.name.localeCompare(b.name);
        return direction === "asc" ? comparison : -comparison;
      }

      if (field === "dueDate") {
        const toTimestamp = (date: string) =>
          date === "—" ? Number.MAX_SAFE_INTEGER : new Date(date).getTime();
        const comparison = toTimestamp(a.dueDate) - toTimestamp(b.dueDate);
        return direction === "asc" ? comparison : -comparison;
      }

      const comparison = a.progress - b.progress;
      return direction === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [projects, debouncedSearch, statusFilter, sortOrder]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProjects, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, sortOrder]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setSortOrder("name-asc");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    search !== "" || statusFilter !== "all" || sortOrder !== "name-asc";

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredProjects,
    paginatedProjects,
    resetFilters,
    hasActiveFilters,
  };
}
