import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import AppRoutes from "./AppRoutes";
import Auth0Provider from "./auth/auth0Provider";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Auth0Provider>
        <AppRoutes />
      </Auth0Provider>
    </Router>
  </React.StrictMode>
);
