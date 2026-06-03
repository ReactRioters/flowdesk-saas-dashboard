import { ProfileSettingsForm } from "../components/profile-settings-form";
import { useState } from "react";
import { Tabs } from "../../../components/ui/tabs";
import { AppearanceSettings } from "../components/appearance-settings";
import { NotificationSettings } from "../components/notification-settings";
import { SecuritySettings } from "../components/security-settings";
import { PageHeader } from "../../../components/ui/page-header";


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
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Settings" }
        ]}
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