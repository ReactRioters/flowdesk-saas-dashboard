import { useState } from "react";
import { toast } from "sonner";

import { Button } from "../../../components/ui/button";

const defaultSettings = {
    productUpdates: true,
    billingAlerts: true,
    securityAlerts: true,
    weeklyReports: false,
};

export function NotificationSettings() {
    const [settings, setSettings] = useState(defaultSettings);

    const toggleSetting = (key: keyof typeof defaultSettings) => {
        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleSave = () => {
        console.log(settings);
        toast.success("Notification settings updated");
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Notification Settings
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Choose which updates you want to receive.
                </p>
            </div>

            <div className="space-y-4">
                {Object.entries(settings).map(([key, value]) => (
                    <label
                        key={key}
                        className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
                    >
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                            {key.replace(/([A-Z])/g, " $1")}
                        </span>

                        <input
                            type="checkbox"
                            checked={value}
                            onChange={() =>
                                toggleSetting(key as keyof typeof defaultSettings)
                            }
                            className="h-4 w-4"
                        />
                    </label>
                ))}
            </div>

            <Button type="button" onClick={handleSave} className="mt-6">
                Save Preferences
            </Button>
        </div>
    );
}