import { Bell, Menu, Search } from "lucide-react";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-300 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Dashboard
            </h2>

            <p className="text-sm text-slate-400">
              Monitor your SaaS performance and activity.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-400 sm:flex">
            <Search className="h-4 w-4" />
            Search
          </button>

          <button className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white">
            <Bell className="h-5 w-5" />
          </button>

          <div className="h-9 w-9 rounded-full bg-slate-800" />
        </div>
      </div>
    </header>
  );
}