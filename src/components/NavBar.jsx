import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="w-full bg-blue-400 p-2 shadow-lg">
      <ul className="flex justify-around items-center text-white">
        <ul>
          <figure>
            <img src="vite.svg" alt="" />
          </figure>
        </ul>
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
      </ul>
    </nav>
  )
}