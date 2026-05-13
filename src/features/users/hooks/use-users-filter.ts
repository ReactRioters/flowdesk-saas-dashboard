import { useEffect, useMemo, useState } from "react";

import type { User } from "../../../services/users-service";
import { useDebounce } from "../../../hooks/use-debounce";
import { useSearchParams } from "react-router-dom";

export function useUsersFilter(users: User[]) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(
        searchParams.get("search") || ""
    );
    const [roleFilter, setRoleFilter] =
        useState(
            searchParams.get("role") || "all"
        );
    const [statusFilter, setStatusFilter] =
        useState(
            searchParams.get("status") || "all"
        );
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

        if (roleFilter !== "all") {
            params.set("role", roleFilter);
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
    }, [
        search,
        roleFilter,
        statusFilter,
        sortOrder,
        currentPage,
        setSearchParams,
    ]);

    const itemsPerPage = 5;

    const filteredUsers = useMemo(() => {
        const filtered = users.filter((user) => {
            const searchValue = debouncedSearch.toLowerCase();

            const matchesSearch =
                user.name.toLowerCase().includes(searchValue) ||
                user.email.toLowerCase().includes(searchValue) ||
                user.role.toLowerCase().includes(searchValue);

            const matchesRole = roleFilter === "all" || user.role === roleFilter;

            const matchesStatus =
                statusFilter === "all" || user.status === statusFilter;

            return matchesSearch && matchesRole && matchesStatus;
        });

        const sorted = [...filtered].sort((a, b) => {
            const comparison = a.name.localeCompare(b.name);

            return sortOrder === "asc" ? comparison : -comparison;
        });

        return sorted;
    }, [users, search, roleFilter, statusFilter, sortOrder, debouncedSearch]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const paginatedUsers = useMemo(() => {
        return filteredUsers.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }, [filteredUsers, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, roleFilter, statusFilter, sortOrder]);

    const resetFilters = () => {
        setSearch("");
        setRoleFilter("all");
        setStatusFilter("all");
        setSortOrder("asc");
        setCurrentPage(1);
    };

    const hasActiveFilters =
        search !== "" ||
        roleFilter !== "all" ||
        statusFilter !== "all" ||
        sortOrder !== "asc";

    return {
        search,
        setSearch,

        roleFilter,
        setRoleFilter,

        statusFilter,
        setStatusFilter,

        sortOrder,
        setSortOrder,

        currentPage,
        setCurrentPage,

        totalPages,

        filteredUsers,
        paginatedUsers,
        resetFilters,
        hasActiveFilters
    };
}