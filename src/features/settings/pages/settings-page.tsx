import { Bell, Lock, Palette, User } from "lucide-react";
import { ProfileSettingsForm } from "../components/profile-settings-form";
import { useState } from "react";
import { Tabs } from "../../../components/ui/tabs";
import { AppearanceSettings } from "../components/appearance-settings";
import { NotificationSettings } from "../components/notification-settings";
import { SecuritySettings } from "../components/security-settings";
import { PageHeader } from "../../../components/ui/page-header";

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
      <PageHeader
        title="Settings"
        description="Manage account preferences, security, notifications, and appearance."
      />

      <Tabs
        tabs={tabs}
        value={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === "Profile" && <ProfileSettingsForm />}

      {activeTab === "Security" && <SecuritySettings />}

      {activeTab === "Notifications" && <NotificationSettings />}

      {activeTab === "Appearance" && <AppearanceSettings />}
    </div>
  );
}