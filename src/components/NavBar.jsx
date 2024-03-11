import { HomeIcon, CloseSessionIcon } from './Icons.jsx'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Articulos, Bodegas, Simcards } from './NavLinks'
import { useAuth } from '../Auth/AuthContext.jsx'

export function NavBar ({ authorize }) {
  const { logout } = useAuth()
  const [renderMenu, setRenderMenu] = useState({ id: '', render: false })
  const handleClickMenu = (ev) => {
    setRenderMenu({ id: ev.target.id, render: true })
  }

  const handleLinkClick = () => {
    setRenderMenu({ id: '', render: false })
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.menu')) {
        return
      }
      setRenderMenu({ id: '', render: false })
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className=" bg-gray-900 flex h-16 items-center justify-around ">

      <figure>
        <NavLink onClick={handleLinkClick} to="/bodega/home" className="">
          <img src="/gane.png" className="h-8" alt="Logo empresa gane" />
        </NavLink>
      </figure>

      <ul className='flex gap-6'>

        <li>
          <NavLink onClick={handleLinkClick} to="/bodega/home" className="text-white hover:text-blue-400 font-semibold">
            <HomeIcon />
          </NavLink>
        </li>

        <li>
          <NavLink onClick={handleLinkClick} to="/bodega/verMovimientos" className=" text-white hover:text-blue-400 font-semibold">
            Movimientos
          </NavLink>
        </li>

        <Articulos handleClickMenu={handleClickMenu} renderMenu={renderMenu} handleLinkClick={handleLinkClick} authorize={authorize} />

        <Bodegas handleClickMenu={handleClickMenu} renderMenu={renderMenu} handleLinkClick={handleLinkClick} authorize={authorize} />

        <Simcards handleClickMenu={handleClickMenu} renderMenu={renderMenu} handleLinkClick={handleLinkClick} authorize={authorize} />

        <li>
          <a className='text-white hover:text-blue-400 font-semibold cursor-pointer' title='Cerrar Sesión' onClick={logout}>
            <CloseSessionIcon />
          </a>
        </li>

      </ul>

    </nav>
  )
}
