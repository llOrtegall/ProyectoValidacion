import { Link } from "react-router-dom";

export function NavBar() {
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
        <li className="hover:text-white">
          <Link to="/home" className="font-semibold">Home</Link>
        </li>
        <li className="hover:hover:text-white">
          <Link to="/items" className="font-semibold">Items</Link>
        </li>
        <li className="hover:text-white">
          <Link to="/created-items" className="font-semibold">Created Items</Link>
        </li>
        <li className="hover:text-white">
          <Link to="/created-bodega" className="font-semibold">Created Bodega</Link>
        </li>
        <li className="hover:text-white">
          <Link to="/asignarItemBodega" className="font-semibold">Asignar Item Bodega</Link>
        </li>
        <li className="hover:text-white">
          <Link to="/bodegas" className="font-semibold">Bodegas</Link>
        </li>
        <li className="hover:text-white">
          <Link to="/crearMovimiento" className="font-semibold">Crear Movimiento</Link>
        </li>
        <li className="hover:text-white">
          <Link to="/verMovimientos" className="font-semibold">Ver Movimientos</Link>
        </li>
      </ul>
    </nav>
  )
}