import { useState } from "react";
import { toast } from "sonner";

import { Button } from "../../../components/ui/button";
import { SettingsSection } from "../../../components/ui/settings-section";

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
        <SettingsSection
            title="Notification Settings"
            description="Choose which updates you want to receive."
        >

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
        </SettingsSection>
    );
}