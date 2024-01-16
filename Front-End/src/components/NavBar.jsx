import { useEffect, useState } from 'react'
import { HomeIcon } from './Icons'
import { Link } from 'react-router-dom'

const links1 = [
  { to: '/bodegas', text: 'Ver Bodegas' },
  { to: '/created-bodega', text: 'Crear Bodega' },
  { to: '/crearMovimiento', text: 'Crear Movimiento' }
]

const links2 = [
  { to: '/items', text: 'Ver Artículos' },
  { to: '/created-items', text: 'Crear Items' },
  { to: '/asignarItemBodega', text: 'Asig. Item Bodega' }
]

const links3 = [
  { to: '/verSimcards', text: 'Ver Simcards' },
  { to: '/createSimcard', text: 'Crear Simcard' },
  { to: '/addSimcards', text: 'Asig. SIM Bodega' },
  { to: '/movimientosSimcards', text: 'Crear Movimiento SIM' }
]

export function NavBar () {
  const [activeArticles, setActiveArticles] = useState(false)
  const [activeMovements, setActiveMovements] = useState(false)
  const [activeSimcards, setActiveSimcards] = useState(false)

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
    <nav className="bg-blue-400 p-2 shadow-xl min-h-14 items-center flex justify-around xl:text-xs 2xl:text-sm">
      <ul className="flex justify-around items-center ">
        <li>
          <figure className='w-16'>
            <img src="gane.png" alt="logo gane yumbo" className='' />
          </figure>
        </li>
      </ul>

      <ul className='flex items-center gap-6'>

        <section className='font-semibold'>
          <Link to='/verMovimientos' className='hover:text-yellow-200 hover:underline'>Ver Movimientos</Link>
        </section>

        <section className='relative font-semibold cursor-pointer' onClick={handleClickArticles}>
          <span className='hover:text-yellow-200 hover:underline'> Articulos | Items</span>
          {
            activeArticles &&
            <ul className='absolute bg-blue-400 top-9 -right-10'>
              {
                links2.map(link => (
                  <li key={link.to} className='w-48 text-center font-semibold hover:text-blue-100 my-2'>
                    <Link to={link.to}>{link.text}</Link>
                  </li>
                ))
              }
            </ul>
          }
        </section>

        <section className='relative font-semibold cursor-pointer' onClick={handleClickMovements}>
          <span className='hover:text-yellow-200 hover:underline'> Bodegas | PDV </span>
          {
            activeMovements &&
            <ul className='absolute bg-blue-400 top-9 -right-10'>
              {
                links1.map(link => (
                  <li key={link.to} className='w-48 text-center font-semibold hover:text-blue-100 my-2'>
                    <Link to={link.to}>{link.text}</Link>
                  </li>
                ))
              }
            </ul>
          }
        </section>

        <section className='relative font-semibold cursor-pointer' onClick={handleClickSimcards}>
          <span className='hover:text-yellow-200 hover:underline'> SimCards</span>
          {
            activeSimcards &&
            <ul className='absolute bg-blue-400 top-9 -right-10'>
              {
                links3.map(link => (
                  <li key={link.to} className='w-48 text-center font-semibold hover:text-blue-100 my-2'>
                    <Link to={link.to}>{link.text}</Link>
                  </li>
                ))
              }
            </ul>
          }
        </section>

        <section className='font-semibold'>
          <Link to="/" className='hover:text-yellow-200'>
            <HomeIcon />
          </Link>
        </section>
      </ul>
    </nav>
  )
}
