import { CloseSessionIcon, HomeIcon, SuccesIcon, LockIcon, UsvgDownIcon } from './Icons'

import { useAuth } from '../Auth/AuthContext.jsx'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const links1 = [
  { to: '/bodega/stock/bodegas', text: 'Ver Bodegas', block: false },
  { to: '/bodega/stock/bodegas/crearBodegas', text: 'Crear Bodega', block: true },
  { to: '/bodega/stock/bodegas/crearMovimientos', text: 'Crear Movimiento', block: true }
]

const links2 = [
  { to: '/bodega/stock/items', text: 'Ver Artículos', block: false },
  { to: '/bodega/stock/items/crearItems', text: 'Crear Items', block: true },
  { to: '/bodega/stock/items/asignarItems', text: 'Asig. Item Bodega', block: true }
]

const links3 = [
  { to: '/bodega/stock/simcards', text: 'Ver Simcards', block: false },
  { to: '/bodega/stock/simcards/crearSimcards', text: 'Crear Simcard', block: true },
  { to: '/bodega/stock/simcards/asignarSimcards', text: 'Asig. SIM Bodega', block: true },
  { to: '/bodega/stock/simcards/movimientosSimcards', text: 'Crear Movimiento SIM', block: true }
]

const Validar = ['Analista Desarrollo', 'Jefe Tecnología', 'Director Tecnología', 'Auxiliar Administrativa', 'Auxiliar Administrativo', 'Administrador', 'Coordinador Soporte']

const RenderIconBlock = (block, { rol }) => {
  if (block === false) {
    return <div className='text-green-500'><SuccesIcon /></div>
  }

  if (block === true && Validar.includes(rol)) {
    return <div className='text-green-500'><SuccesIcon /></div>
  }

  return <div className='text-red-500'><LockIcon /></div>
}

export function NavBar (rol) {
  const [activeArticles, setActiveArticles] = useState(false)
  const [activeMovements, setActiveMovements] = useState(false)
  const [activeSimcards, setActiveSimcards] = useState(false)

  const { logout } = useAuth()

  const handleClosesession = () => {
    logout()
  }

  const handleClickSimcards = (event) => {
    event.stopPropagation()
    setActiveSimcards(!activeSimcards)
    setActiveMovements(false)
    setActiveArticles(false)
  }

  const handleClickArticles = (event) => {
    event.stopPropagation()
    setActiveArticles(!activeArticles)
    setActiveMovements(false)
    setActiveSimcards(false)
  }

  const handleClickMovements = (event) => {
    event.stopPropagation()
    setActiveMovements(!activeMovements)
    setActiveArticles(false)
    setActiveSimcards(false)
  }

  const handleClickOutside = () => {
    setActiveArticles(false)
    setActiveMovements(false)
    setActiveSimcards(false)
  }

  useEffect(() => {
    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (

    <>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* //TODO: logo Gane */}
        <Link to="/bodega/home">
          <img src="../../public/gane.png" className="h-8" alt="Logo" />
        </Link>

        <section className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-900 ">

            <Link to="/bodega/home" title='Inicio App' className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent  md:p-0 md:text-white md:hover:text-blue-500">
              <HomeIcon />
            </Link>

            <li className='flex gap-2'>

              <Link to="/bodega/stock/movimientos">
                <button className="relative flex items-center justify-between w-full py-2 px-3 rounded   md:border-0  md:p-0 md:w-auto text-white md:hover:text-blue-500 focus:text-white border-gray-700 hover:bg-gray-700 ">
                  Movimientos
                </button>
              </Link>

              <button className="relative flex items-center justify-between w-full py-2 px-3 rounded   md:border-0  md:p-0 md:w-auto text-white md:hover:text-blue-500 focus:text-white border-gray-700 hover:bg-gray-700" onClick={handleClickArticles}>Artículos <UsvgDownIcon />
                {/* // !! Dropdown menu --> */}
                {
                  activeArticles && (
                    <section className="absolute bottom-[-144px] -right-10 font-normal divide-y rounded-lg shadow w-44 bg-gray-700 ">
                      <ul className="py-2 text-sm  text-gray-400" >
                        <li>
                          {
                            links2.map(link => (
                              <Link to={link.to} key={link.to} className='flex items-center justify-between px-4 py-2  hover:bg-gray-600 hover:text-white'>
                                {link.text}
                                {RenderIconBlock(link.block, rol)}
                              </Link>
                            ))
                          }
                        </li>
                      </ul>
                    </section>
                  )
                }
              </button>

              <button className="relative flex items-center justify-between w-full py-2 px-3 rounded   md:border-0  md:p-0 md:w-auto text-white md:hover:text-blue-500 focus:text-white border-gray-700 hover:bg-gray-700" onClick={handleClickMovements}>Bodegas <UsvgDownIcon />
                {/* // !! Dropdown menu --> */}
                {
                  activeMovements && (
                    <section className="absolute bottom-[-144px] -right-10 font-normal divide-y rounded-lg shadow w-44 bg-gray-700 ">
                      <ul className="py-2 text-sm  text-gray-400" >
                        {
                          links1.map(link => (
                            <Link to={link.to} key={link.to} className='flex items-center justify-between px-4 py-2  hover:bg-gray-600 hover:text-white'>
                              {link.text}
                              {RenderIconBlock(link.block, rol)}
                            </Link>
                          ))
                        }
                      </ul>
                    </section>
                  )
                }
              </button>

              <button className="relative flex items-center justify-between w-full py-2 px-3 rounded   md:border-0  md:p-0 md:w-auto text-white md:hover:text-blue-500 focus:text-white border-gray-700 hover:bg-gray-700" onClick={handleClickSimcards}>Simcards <UsvgDownIcon />
                {/* // !! Dropdown menu --> */}
                {
                  activeSimcards && (
                    <section className="absolute top-[43px] -right-10 w-52 font-normal divide-y rounded-lg shadow bg-gray-700 ">
                      <ul className="py-2 text-sm  text-gray-400">
                        {
                          links3.map(link => (
                            <Link to={link.to} key={link.to} className='flex items-center justify-between px-4 py-2  hover:bg-gray-600 hover:text-white'>
                              {link.text}
                              {RenderIconBlock(link.block, rol)}
                            </Link>
                          ))
                        }
                      </ul>
                    </section>
                  )
                }
              </button>

              <section onClick={handleClosesession} className="cursor-pointer block ml-4 py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0  md:hover:text-blue-500" title='Cerrar Sesión'>
                <CloseSessionIcon />
              </section>
            </li>
          </ul>
        </section>
      </div>
    </>
  )
}
