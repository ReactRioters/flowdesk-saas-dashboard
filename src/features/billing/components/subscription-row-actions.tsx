import { MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SubscriptionRowActionsProps = {
  onChangePlan?: () => void;
  onCancel?: () => void;
};

export function SubscriptionRowActions({
  onChangePlan,
  onCancel,
}: SubscriptionRowActionsProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg border border-slate-300 p-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <button
            onClick={() => {
              onChangePlan?.();
              setOpen(false);
            }}
            className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Change Plan
          </button>

          <button
            onClick={() => {
              onCancel?.();
              setOpen(false);
            }}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            Cancel Subscription
          </button>
        </div>
      )}
    </div>
  );
}