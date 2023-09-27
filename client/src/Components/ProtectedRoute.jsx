import { Navigate, Outlet } from "react-router-dom"

export function ProtectedRoute() {

  let isLogged = false

  if (!isLogged) {
    <Navigate to="/" />
  }

  return (
    <Outlet />
  )
}