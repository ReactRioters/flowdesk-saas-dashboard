import { useEffect, useMemo, useState } from "react";
import type { Subscription } from "../../../services/billing-service";
import { useSearchParams } from "react-router-dom";

export function useSubscriptionsFilter(subscriptions: Subscription[]) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearchState] = useState(searchParams.get("search") || "");
  const [planFilter, setPlanFilterState] = useState(searchParams.get("plan") || "all");
  const [statusFilter, setStatusFilterState] = useState(searchParams.get("status") || "all");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const setSearch = (value: string) => {
    setSearchState(value);
    setCurrentPage(1);
  };
  const setPlanFilter = (value: string) => {
    setPlanFilterState(value);
    setCurrentPage(1);
  };
  const setStatusFilter = (value: string) => {
    setStatusFilterState(value);
    setCurrentPage(1);
  };
  const itemsPerPage = 5;

  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (planFilter !== "all") params.set("plan", planFilter);
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (currentPage > 1) params.set("page", String(currentPage));

    setSearchParams(params);
  }, [search, planFilter, statusFilter, currentPage, setSearchParams]);

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((subscription) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        subscription.customerName.toLowerCase().includes(searchValue) ||
        subscription.email.toLowerCase().includes(searchValue);

      const matchesPlan =
        planFilter === "all" || subscription.plan === planFilter;

      const matchesStatus =
        statusFilter === "all" || subscription.status === statusFilter;

      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [subscriptions, search, planFilter, statusFilter]);

  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);

  const paginatedSubscriptions = useMemo(() => {
    return filteredSubscriptions.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredSubscriptions, currentPage]);

  const hasActiveFilters =
    search !== "" ||
    planFilter !== "all" ||
    statusFilter !== "all";

  const resetFilters = () => {
    setSearch("");
    setPlanFilter("all");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  return {
    search,
    setSearch,
    planFilter,
    setPlanFilter,
    statusFilter,
    setStatusFilter,
    filteredSubscriptions,
    paginatedSubscriptions,
    currentPage,
    setCurrentPage,
    totalPages,
    hasActiveFilters,
    resetFilters,
  };
}