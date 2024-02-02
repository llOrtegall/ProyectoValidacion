import { ButtonDow, HomeIcon, CloseSessionIcon } from './Icons.jsx'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function NavBar ({ company, closeSesion }) {
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
      <div className='text-blue-700 font-semibold bottom-2 right-2 absolute'>Base De Datos: <span className='text-red-500'> {company} </span></div>
      <figure>
        <Link onClick={handleLinkClick} to="/bodega/home" className="">
          <img src="/gane.png" className="h-8" alt="Flowbite Logo" />
        </Link>
      </figure>

      <ul className='flex gap-6'>

        <li>
          <Link onClick={handleLinkClick} to="/bodega/home" className="text-white hover:text-blue-400 font-semibold">
            <HomeIcon />
          </Link>
        </li>

        <li>
          <Link onClick={handleLinkClick} to="/bodega/verMovimientos" className=" text-white hover:text-blue-400 font-semibold">Movimientos</Link>
        </li>

        <li className='relative flex justify-center menu'>
          <button id='Articulos' className="flex font-semibold text-white items-center hover:text-blue-400" onClick={handleClickMenu}>
            Artículos
            <ButtonDow />
          </button>
          {
            renderMenu.id === 'Articulos' && renderMenu.render === true && (
              <article className="absolute -left-12 top-11 w-44">
                <ul className=' bg-gray-900 py-2 rounded-b-lg'>
                  <li className='flex flex-col items-center w-full gap-2'>
                    <Link onClick={handleLinkClick} to="/bodega/stock/items" className="text-white hover:text-blue-400 font-semibold py-2">Ver Items</Link>
                    <Link onClick={handleLinkClick} to="#" className="text-white hover:text-blue-400 font-semibold py-2">Crear Items</Link>
                    <Link onClick={handleLinkClick} to="#" className="text-white hover:text-blue-400 font-semibold py-2">Asginar Items</Link>
                  </li>
                </ul>
              </article>
            )
          }
        </li>

        <li className='relative flex justify-center menu'>
          <button id='Bodegas' className="flex font-semibold text-white items-center hover:text-blue-400" onClick={handleClickMenu}>
            Bodegas
            <ButtonDow />
          </button>
          {
            renderMenu.id === 'Bodegas' && renderMenu.render === true && (
              <article className="absolute -left-12 top-11 w-44">
                <ul className=' bg-gray-900 py-2 rounded-b-lg'>
                  <li className='flex flex-col items-center w-full gap-2'>
                    <Link onClick={handleLinkClick} to="/bodega/stock/bodega" className="text-white hover:text-blue-400 font-semibold py-2">Ver Bodegas</Link>
                    <Link onClick={handleLinkClick} to="#" className="text-white hover:text-blue-400 font-semibold py-2">Crear Bodega</Link>
                    <Link onClick={handleLinkClick} to="#" className="text-white hover:text-blue-400 font-semibold py-2">Crear Movimiento</Link>
                  </li>
                </ul>
              </article>
            )
          }
        </li>

        <li className='relative flex justify-center menu'>
          <button id='Simcards' className="flex font-semibold text-white items-center hover:text-blue-400" onClick={handleClickMenu}>
            Simcards
            <ButtonDow />
          </button>
          {
            renderMenu.id === 'Simcards' && renderMenu.render === true && (
              <article className="absolute -left-12 top-11 w-44">
                <ul className=' bg-gray-900 py-2 rounded-b-lg'>
                  <li className='flex flex-col items-center w-full gap-2'>
                    <Link onClick={handleLinkClick} to="#" className="text-white hover:text-blue-400 font-semibold py-2">Ver Simcards</Link>
                    <Link onClick={handleLinkClick} to="#" className="text-white hover:text-blue-400 font-semibold py-2">Crear Simcards</Link>
                    <Link onClick={handleLinkClick} to="#" className="text-white hover:text-blue-400 font-semibold py-2">Crear Movimiento SIM</Link>
                  </li>
                </ul>
              </article>
            )
          }
        </li>

        <li>
          <a className='text-white hover:text-blue-400 font-semibold cursor-pointer' onClick={closeSesion}>
            <CloseSessionIcon />
          </a>
        </li>

      </ul>

    </nav>
  )
}
