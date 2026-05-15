import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const notifications = [
  {
    id: "1",
    title: "New user joined",
    description: "Priya Sharma joined your workspace.",
    time: "5 min ago",
    unread: true,
  },
  {
    id: "2",
    title: "Subscription upgraded",
    description: "Michael Chen upgraded to Business plan.",
    time: "20 min ago",
    unread: true,
  },
  {
    id: "3",
    title: "Payment successful",
    description: "Invoice INV-1024 has been paid.",
    time: "1 hour ago",
    unread: false,
  },
];

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        <Bell className="h-5 w-5" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Notifications
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              You have {unreadCount} unread notifications.
            </p>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                type="button"
                className="flex w-full gap-3 border-b border-slate-100 px-4 py-3 text-left last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/70"
              >
                <span
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                    notification.unread
                      ? "bg-blue-500"
                      : "bg-slate-300 dark:bg-slate-700"
                  }`}
                />

                <span>
                  <span className="block text-sm font-medium text-slate-900 dark:text-white">
                    {notification.title}
                  </span>
                  <span className="mt-1 block text-xs text-slate-600 dark:text-slate-400">
                    {notification.description}
                  </span>
                  <span className="mt-2 block text-xs text-slate-400">
                    {notification.time}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}