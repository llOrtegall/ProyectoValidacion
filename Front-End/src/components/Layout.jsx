import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar.jsx'

export function Layout () {
  return (
    <section className='bg-slate-400'>
      <NavBar/>
      <Outlet />
    </section>
  )
}
