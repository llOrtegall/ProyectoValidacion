import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar.jsx'

export function Layout () {
  return (
    <section className='relative h-screen'>
      <nav className='absolute z-50 w-full'>
        <NavBar/>
      </nav>
      <main className='h-full pt-16'>
        <Outlet />
      </main>
    </section>
  )
}
