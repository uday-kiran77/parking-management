import React, { useContext } from "react";
import {
  Route,
  Redirect,
  Navigate,
  Routes,
  useLocation,
  Outlet,
} from "react-router-dom";
import AuthContext from "../Store/auth-context";

export const PrivateRoute = ({ children }) => {
  const ctx = useContext(AuthContext);

  return ctx.isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
