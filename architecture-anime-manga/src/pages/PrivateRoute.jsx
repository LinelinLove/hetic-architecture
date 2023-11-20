import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

export default function PrivateRoute({ redirect }) {
  const { isUserLoggedIn } = useAuth();

  return isUserLoggedIn ? <Outlet /> : <Navigate to={redirect} />;
}
