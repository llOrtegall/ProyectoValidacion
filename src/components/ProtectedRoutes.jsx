import { Navigate, Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'

export const ProtectdeRoutes = ({ isAllowed, children, redirectTo = '/' }) => {
  if (!isAllowed) return <Navigate to={redirectTo} />

  return (
    <>
      <NavBar />
      {children || <Outlet />}
    </>
  )
}
