import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoggedinRoutes from "./Routes/LoggedinRoutes.jsx";
import NonloggedinRoutes from "./Routes/nonLoggedinRoutes.jsx";
import "./styles/index.css";

let login = true;
let routes = NonloggedinRoutes;

if (login) {
  routes = LoggedinRoutes;
}
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
