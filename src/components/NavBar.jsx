import { ButtonDow, HomeIcon, CloseSessionIcon, SuccesIcon, LockIcon } from './Icons.jsx'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function NavBar ({ company, closeSesion, authorize }) {
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
      <div className='text-blue-700 font-semibold bottom-2 left-2 absolute'>Base De Datos: <span className='text-red-500'> {company} </span></div>
      <figure>
        <Link onClick={handleLinkClick} to="/bodega/home" className="">
          <img src="../public/gane.png" className="h-8" alt="Flowbite Logo" />
        </Link>
      </figure>

      <ul className='flex gap-6'>

        <li>
          <Link onClick={handleLinkClick} to="/bodega/home" className="text-white hover:text-blue-400 font-semibold">
            <HomeIcon />
          </Link>
        </li>

        <li>
          <Link onClick={handleLinkClick} to="/bodega/verMovimientos" className=" text-white hover:text-blue-400 font-semibold">
            Movimientos
          </Link>
        </li>

        <li className='relative flex justify-center menu'>
          <button id='Articulos' className="flex font-semibold text-white items-center hover:text-blue-400" onClick={handleClickMenu}>
            Artículos
            <ButtonDow />
          </button>
          {
            renderMenu.id === 'Articulos' && renderMenu.render === true && (
              <article className="absolute -left-16 top-11 w-52">
                <ul className=' bg-gray-900 py-2 rounded-b-lg'>
                  <li className='flex flex-col items-center w-full gap-2'>
                    <Link onClick={handleLinkClick} to="/bodega/stock/items"
                      className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                      Ver Items
                      <figure className=' text-green-600 rounded-full'>
                        <SuccesIcon />
                      </figure>
                    </Link>
                    <Link onClick={handleLinkClick} to="/bodega/stock/items/crearItems"
                      className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                      Crear Items
                      {
                        authorize === 'Administrador' || authorize === 'Aux administrativo'
                          ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                          : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
                      }
                    </Link>
                    <Link onClick={handleLinkClick} to="/bodega/stock/items/asignarItems"
                      className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                      Asginar Items
                      {
                        authorize === 'Administrador' || authorize === 'Aux administrativo'
                          ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                          : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
                      }
                    </Link>
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
              <article className="absolute -left-16 top-11 w-52">
                <ul className=' bg-gray-900 py-2 rounded-b-lg'>
                  <li className='flex flex-col items-center w-full gap-2'>
                    <Link onClick={handleLinkClick} to="/bodega/stock/bodega"
                      className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                      Ver Bodegas
                      <figure className='text-green-500 rounded-full'>
                        <SuccesIcon />
                      </figure>
                    </Link>
                    <Link onClick={handleLinkClick} to="/bodega/stock/bodega/crearBodega"
                      className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                      Crear Bodega
                      {
                        authorize === 'Coordinador Soporte' || authorize === 'Aux administrativo' || authorize === 'Administrador'
                          ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                          : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
                      }
                    </Link>
                    <Link onClick={handleLinkClick} to="/bodega/stock/bodega/crearMovimiento"
                      className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                      Crear Movimiento
                      {
                        authorize === 'Coordinador Soporte' || authorize === 'Aux administrativo' || authorize === 'Administrador'
                          ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                          : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
                      }
                    </Link>
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
              <article className="absolute -left-18 top-11 w-56">
                <ul className=' bg-gray-900 py-2 rounded-b-lg'>
                  <li className='flex flex-col items-center w-full gap-2'>
                    <Link onClick={handleLinkClick} to="/bodega/stock/verSimcards"
                      className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                      Ver Simcards
                      <figure className='text-green-500 rounded-full'>
                        <SuccesIcon />
                      </figure>
                    </Link>
                    <Link onClick={handleLinkClick} to="/bodega/stock/simcards/crearSimcard"
                      className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                      Crear Simcards
                      {
                        authorize === 'Coordinador Soporte' || authorize === 'Administrador'
                          ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                          : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
                      }
                    </Link>
                    <Link onClick={handleLinkClick} to="/bodega/stock/simcards/asignarSimcards"
                      className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                      Asignar Simcards
                      {
                        authorize === 'Coordinador Soporte' || authorize === 'Administrador'
                          ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                          : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
                      }
                    </Link>
                    <Link onClick={handleLinkClick} to="/bodega/stock/simcards/crearMovimientoSimcard"
                      className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                      Crear Mov Sims
                      {
                        authorize === 'Coordinador Soporte' || authorize === 'Administrador'
                          ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                          : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
                      }
                    </Link>
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
