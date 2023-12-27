import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="bg-blue-400 p-2 shadow-lg min-h-16 items-center flex justify-around">
      <ul className="flex justify-around items-center text-white">
        <li>
          <figure>
            <img src="vite.svg" alt="" />
          </figure>
        </li>
      </ul>
      <ul className="flex justify-around items-center text-white gap-4">
        <li>
          <Link to="/home" className="font-semibold">Home</Link>
        </li>
        <li>
          <Link to="/items" className="font-semibold">Items</Link>
        </li>
        <li>
          <Link to="/created-items" className="font-semibold">Created Items</Link>
        </li>
        <li>
          <Link to="/created-bodega" className="font-semibold">Created Bodega</Link>
        </li>
        <li>
          <Link to="/asignarItemBodega" className="font-semibold">Asignar Item Bodega</Link>
        </li>
        <li>
          <Link to="/bodegas" className="font-semibold">Bodegas</Link>
        </li>
        <li>
          <Link to="/crearMovimiento" className="font-semibold">Crear Movimiento</Link>
        </li>
      </ul>
    </nav>
  )
}