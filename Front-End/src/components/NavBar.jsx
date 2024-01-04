import { Link } from 'react-router-dom'

const links = [
  { to: '/home', text: 'Home' },
  { to: '/items', text: 'Items' },
  { to: '/created-items', text: 'Crear Items' },
  { to: '/created-bodega', text: 'Crear Bodega' },
  { to: '/asignarItemBodega', text: 'Asignar Item Bodega' },
  { to: '/bodegas', text: 'Bodegas' },
  { to: '/crearMovimiento', text: 'Crear Movimiento' },
  { to: '/verMovimientos', text: 'Ver Movimientos' },
  { to: '/createSimcard', text: 'Crear Simcard' },
  { to: '/verSimcards', text: 'Ver Simcards' }
]

export function NavBar () {
  return (
    <nav className="bg-blue-400 p-2 shadow-lg min-h-16 items-center flex justify-around mb-2">
      <ul className="flex justify-around items-center ">
        <li>
          <figure>
            <img src="gane.png" alt="logo gane yumbo" width={90} />
          </figure>
        </li>
      </ul>
      <ul className="flex justify-around items-center text-black gap-4 ">
        {links.map((link, index) => (
          <li key={index} className="hover:text-white">
            <Link to={link.to} className="font-semibold">{link.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
