type TabsProps = {
    tabs: string[];
    value: string;
    onChange: (value: string) => void;
};

export function Tabs({
    tabs,
    value,
    onChange,
}: TabsProps) {
    return (
        <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
            {tabs.map((tab) => {
                const active = value === tab;

                return (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => onChange(tab)}
                        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${active
                                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                            }`}
                    >
                        {tab}
                    </button>
                );
            })}
        </div>
    );
}