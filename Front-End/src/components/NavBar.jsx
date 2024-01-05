import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// { to: '/home', text: 'Home' },

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

// const links3 = [
//   { to: '/createSimcard', text: 'Crear Simcard' },
//   { to: '/verSimcards', text: 'Ver Simcards' }
// ]

export function NavBar () {
  const [activeArticles, setActiveArticles] = useState(false)
  const [activeMovements, setActiveMovements] = useState(false)

  const handleClickArticles = (event) => {
    event.stopPropagation()
    setActiveArticles(!activeArticles)
    setActiveMovements(false)
  }

  const handleClickMovements = (event) => {
    event.stopPropagation()
    setActiveMovements(!activeMovements)
    setActiveArticles(false)
  }

  const handleClickOutside = () => {
    setActiveArticles(false)
    setActiveMovements(false)
  }

  useEffect(() => {
    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <nav className="bg-blue-400 p-2 shadow-xl min-h-16 items-center flex justify-around">
      <ul className="flex justify-around items-center ">
        <li>
          <figure>
            <img src="gane.png" alt="logo gane yumbo" width={90} />
          </figure>
        </li>
      </ul>

      <ul className='flex gap-2 cursor-pointer'>
        <section className='relative font-semibold  mx-4 ' onClick={handleClickArticles}>
          <span className='hover:text-yellow-200 hover:underline'> Articulos | Items</span>
          {
            activeArticles &&
            <ul className='absolute bg-blue-400 p-2 shadow-lg top-11 -right-20 rounded-b-md'>
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
        <section className='relative font-semibold mx-4' onClick={handleClickMovements}>
          <span className='hover:text-yellow-200 hover:underline'> Bodegas | PDV </span>
          {
            activeMovements &&
            <ul className='absolute bg-blue-400 p-2 shadow-lg top-11 -right-20 rounded-b-md'>
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
        <section className='font-semibold'>
          <ul>
            <li>
              <Link to='/verMovimientos' className='hover:text-yellow-200 hover:underline'>Ver Movimientos</Link>
            </li>
          </ul>
        </section>
      </ul>
    </nav>
  )
}
