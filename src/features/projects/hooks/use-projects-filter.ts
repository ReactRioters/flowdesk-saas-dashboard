import { useEffect, useMemo, useState } from "react";
import type { Project } from "../../../services/projects-service";
import { useDebounce } from "../../../hooks/use-debounce";
import { useSearchParams } from "react-router-dom";

export function useProjectsFilter(projects: Project[]) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    searchParams.get("sort") === "desc" ? "desc" : "asc"
  );
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

    if (sortOrder !== "asc") {
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
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === "asc" ? comparison : -comparison;
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
    setSortOrder("asc");
    setCurrentPage(1);
  };

  const hasActiveFilters = search !== "" || statusFilter !== "all" || sortOrder !== "asc";

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
