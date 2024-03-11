import { Navigate, Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'

export const ProtectdeRoutes = ({ isAllowed, children, redirectTo = '/bodega/home', autorize }) => {
  if (!isAllowed) return <Navigate to={redirectTo} />

  return (
    <>
      <NavBar authorize={autorize}/>
      {children || <Outlet />}
    </>
  )
}
