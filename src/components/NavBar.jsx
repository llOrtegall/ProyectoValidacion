import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ButtonDow } from './Icons.jsx'

export function NavBar () {
  const [bodega, setBodega] = useState(false)

  const handleClickBodega = () => {
    setBodega(!bodega)
  }

  console.log(bodega)
  return (
    <nav className=" bg-gray-900 flex h-16 items-center justify-around ">

      <figure>
        <Link to="#" className="">
          <img src="/gane.png" className="h-8" alt="Flowbite Logo" />
        </Link>
      </figure>

      <ul className='relative w-44 flex justify-center'>
        <button className="flex font-semibold text-white items-center hover:text-blue-400" onClick={handleClickBodega}>
          Items
          <ButtonDow />
        </button>
        {
          bodega && (
            <article className="absolute left-0 top-11 w-44">
              <ul className=' bg-gray-900 py-2 px-4 rounded-b-lg'>
                <li className='flex flex-col items-center w-full gap-2'>
                  <Link to="#" className="text-white hover:text-blue-400 font-semibold py-2">Ver Items</Link>
                  <Link to="#" className="text-white hover:text-blue-400 font-semibold py-2">Crear Items</Link>
                  <Link to="#" className="text-white hover:text-blue-400 font-semibold py-2">Asginar Items</Link>
                </li>
              </ul>
            </article>
          )
        }
      </ul>

    </nav>
  )
}
