import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";

import { ThemeProvider } from "./app/providers/theme-provider";
import { appRoutes } from "./app/routes/app-routes";
import { QueryProvider } from "./app/providers/query-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryProvider>
      <RouterProvider router={appRoutes} />
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>
);