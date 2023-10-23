import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export function ProtectedRoute() {

  const { username } = useContext(AuthContext);

  if (username === true) {
    return <Outlet />
  } else {
    return <Navigate to="/" />
  }

}