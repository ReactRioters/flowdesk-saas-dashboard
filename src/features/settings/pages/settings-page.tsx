import { Bell, Lock, Palette, User } from "lucide-react";
import { ProfileSettingsForm } from "../components/profile-settings-form";
import { useState } from "react";
import { Tabs } from "../../../components/ui/tabs";
import { AppearanceSettings } from "../components/appearance-settings";
import { NotificationSettings } from "../components/notification-settings";

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
  const tabs = [
    "Profile",
    "Security",
    "Notifications",
    "Appearance",
  ];

  const [activeTab, setActiveTab] =
    useState("Profile");


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

      <Tabs
        tabs={tabs}
        value={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === "Profile" && (
        <ProfileSettingsForm />
      )}

      {activeTab === "Security" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Security Settings
          </h2>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Security settings UI coming soon.
          </p>
        </div>
      )}

      {activeTab === "Notifications" && <NotificationSettings />}

      {activeTab === "Appearance" && <AppearanceSettings />}
    </div>
  );
}