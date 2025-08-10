import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Display from "./pages/Display";
import ControlPlane from "./pages/ControlPlane";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Display,
  },
  {
    path: "/admin",
    Component: ControlPlane,
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
