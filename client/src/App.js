import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import React, { useContext, Suspense, useState } from "react";
import { Route, Redirect, Router, Navigate, Routes } from "react-router-dom";
import { FullScreenLoader } from "./components/Utils/FullScreenLoader";

import AuthContext from "./Store/auth-context";
import { PrivateRoute } from "./utils/PrivateRoute";

const Login = React.lazy(() => import("./Pages/Login.jsx"));
const Register = React.lazy(() => import("./Pages/Register"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));

function App() {
  const [theme, setTheme] = useState("dark");
  const ctx = useContext(AuthContext);

  const handleThemeChange = () => {
    setTheme((prev) => {
      return prev === "dark" ? "light" : "dark";
    });
  };

  return (
    <MantineProvider
      theme={{ colorScheme: theme }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider>
        <Routes>
          <Route
            path="/login"
            element={
              ctx.isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Suspense fallback={<FullScreenLoader visible={true} />}>
                  <Login />
                </Suspense>
              )
            }
          />
          <Route
            path="/register"
            element={
              ctx.isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Suspense fallback={<FullScreenLoader visible={true} />}>
                  <Register />
                </Suspense>
              )
            }
          ></Route>
          <Route
            path="*"
            element={
              <PrivateRoute>
                <Dashboard theme={theme} setTheme={handleThemeChange} />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
