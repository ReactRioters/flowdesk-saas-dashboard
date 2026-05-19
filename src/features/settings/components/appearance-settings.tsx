import { Moon, Sun } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { useThemeStore } from "../../../store/theme-store";
import { SettingsSection } from "../../../components/ui/settings-section";

export function AppearanceSettings() {
    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    const isDark = theme === "dark";

    return (
        <SettingsSection
            title="Appearance Settings"
            description="Customize your dashboard theme preference."
        >
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Appearance Settings
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Customize your dashboard theme preference.
                </p>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-slate-100 p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </div>

                    <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                            {isDark ? "Dark Mode" : "Light Mode"}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Current dashboard appearance.
                        </p>
                    </div>
                </div>

                <Button type="button" onClick={toggleTheme}>
                    Toggle Theme
                </Button>
            </div>
        </SettingsSection>
    );
}