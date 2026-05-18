import { Bell, Lock, Palette, User } from "lucide-react";
import { ProfileSettingsForm } from "../components/profile-settings-form";

const settingsSections = [
  {
    title: "Profile Settings",
    description: "Update your personal information and workspace identity.",
    icon: User,
  },
  {
    title: "Appearance",
    description: "Manage theme preferences and dashboard display options.",
    icon: Palette,
  },
  {
    title: "Security",
    description: "Manage password, sessions, and account security settings.",
    icon: Lock,
  },
  {
    title: "Notifications",
    description: "Control email, billing, and product update notifications.",
    icon: Bell,
  },
];

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Manage account preferences, security, notifications, and appearance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {settingsSections.map((section) => {
          const Icon = section.icon;

          return (
            <div
              key={section.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Icon className="h-5 w-5" />
              </div>

              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {section.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {section.description}
              </p>
            </div>
          );
        })}
      </div>
      <ProfileSettingsForm />
    </div>
  );
}