import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/authContext.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoggedinRoutes from "./Routes/Routes.jsx";
import "./styles/index.css";
import { ThemeProvider } from "./components/Theme/ThemeContext.jsx";
const router = createBrowserRouter(LoggedinRoutes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ThemeProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ThemeProvider>
  </AuthProvider>
);
