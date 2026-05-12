import { createBrowserRouter } from "react-router-dom";

import App from "../../App";
import { LoginPage } from "../../features/auth/pages/login-page";
import { AnalyticsPage } from "../../features/dashboard/pages/analytics-page";
import { DashboardPage } from "../../features/dashboard/pages/dashboard-page";
import { BillingPage } from "../../features/billing/pages/billing-page";
import { SettingsPage } from "../../features/settings/pages/settings-page";
import { UsersPage } from "../../features/users/pages/users-page";
import { ProtectedRoute } from "./protected-route";

export const appRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "users", element: <UsersPage /> },
          { path: "analytics", element: <AnalyticsPage /> },
          { path: "billing", element: <BillingPage /> },
          { path: "settings", element: <SettingsPage /> },
        ],
      },
    ],
  },
]);