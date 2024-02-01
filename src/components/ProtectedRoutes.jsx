import { Navigate, Outlet } from 'react-router-dom'
import { NavBar } from './NavBar.jsx'

export const ProtectdeRoutes = ({ isAllowed, children, redirectTo = '/login', rol }) => {
  if (!isAllowed) return <Navigate to={redirectTo} />

  return (
    <>
      <NavBar rol={rol} />
      {children || <Outlet />}
    </>
  )
}
