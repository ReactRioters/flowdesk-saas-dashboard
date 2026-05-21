import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const searchablePages = [
  {
    label: "Dashboard",
    description: "View SaaS overview and analytics",
    path: "/",
  },
  {
    label: "Users",
    description: "Manage users, roles, and status",
    path: "/users",
  },
  {
    label: "Projects",
    description: "Monitor milestones, progress, and collaborations",
    path: "/projects",
  },
  {
    label: "Billing",
    description: "Manage subscriptions and plans",
    path: "/billing",
  },
  {
    label: "Analytics",
    description: "View product and growth insights",
    path: "/analytics",
  },
  {
    label: "Settings",
    description: "Manage account and application settings",
    path: "/settings",
  },
];

export function GlobalSearch() {
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const hasSearch = search.trim().length > 0;

  const results = useMemo(() => {
    if (!hasSearch) return [];

    const value = search.toLowerCase();

    return searchablePages.filter((page) => {
      return (
        page.label.toLowerCase().includes(value) ||
        page.description.toLowerCase().includes(value)
      );
    });
  }, [search, hasSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSearch("");
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearch("");
      }
    }

    function handleShortcut(event: KeyboardEvent) {
      const isK = event.key.toLowerCase() === "k";

      if ((event.ctrlKey || event.metaKey) && isK) {
        event.preventDefault();

        inputRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleShortcut);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setSearch("");
  };

  return (
    <div ref={containerRef} className="relative hidden w-80 sm:block">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

      <input
        ref={inputRef}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search pages..."
        className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
      />

      {hasSearch && (
        <div className="absolute right-0 z-50 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
          {results.length > 0 ? (
            results.map((page) => (
              <button
                key={page.path}
                type="button"
                onClick={() => handleNavigate(page.path)}
                className="block w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <span className="block text-sm font-medium text-slate-900 dark:text-white">
                  {page.label}
                </span>
                <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                  {page.description}
                </span>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}