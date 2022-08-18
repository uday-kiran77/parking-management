import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Styles/main.css";

import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Store/auth-context";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <CookiesProvider>
      <AuthContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AuthContextProvider>
    </CookiesProvider>
  </BrowserRouter>
);
