import { createBrowserRouter } from "react-router-dom";
import App from "../../App";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />
  }
]);