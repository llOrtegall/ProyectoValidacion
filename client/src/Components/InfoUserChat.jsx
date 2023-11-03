import { useState, useEffect } from 'react'
import { InfoIcon } from './IconsSvg'
import { CrearClienteFiel, EditarClienteChat, EliminarClienteChat } from './OptionsUser.jsx'

export function InfoUserChat ({ user, fun }) {
  console.log(user)

  const { cedula, nombre, telefono, correo, telwhats } = user[0]
  const [activeComponent, setActiveComponent] = useState(null)
  const fetchData = fun

  console.log(activeComponent)

  const handleButtonClick = (component) => {
    setActiveComponent(component)
  }

  const closeComponent = () => {
    setActiveComponent(null)
  }

  useEffect(() => {
    setActiveComponent(null)
  }, [user])

  return (
    <>

      <section className='bg-gray-500 rounded-xl flex items-center p-2 m-2 h-80'>

        <article className='flex items-center h-full'>
          <div className='flex items-center m-4'>
            <InfoIcon className='text-white' />
          </div>

          <div className='items-center m-4 w-80'>
            <dd className='text-white '> <span className='text-black font-semibold pr-2'>Nombres: </span>{nombre}</dd>
            <dd className='text-white '><span className='text-black font-semibold pr-2'>N° Documento: </span>{cedula}</dd>
            <dd className='text-white '><span className='text-black font-semibold pr-2'>Tel / Cel: </span>{telefono}</dd>
            <dd className='text-white '><span className='text-black font-semibold pr-2'>Correo: </span>{correo}</dd>
            <dd className='text-white '><span className='text-black font-semibold pr-2'>Registro: </span>{telwhats}</dd>
          </div>
        </article>

        <article className='flex flex-col'>
          <button onClick={() => handleButtonClick(<CrearClienteFiel client={user[0]} funClose={closeComponent} />)} className='bg-green-500 p-2 m-2 rounded-xl text-white font-semibold hover:text-black hover:bg-white '>Agregar Usuario</button>
          <button onClick={() => handleButtonClick(<EditarClienteChat client={user[0]} fun={fetchData} funClose={closeComponent} />)} className=' bg-yellow-500 p-2 m-2 rounded-xl text-white font-semibold hover:text-black hover:bg-white '>Editar Usuario</button>
          <button onClick={() => handleButtonClick(<EliminarClienteChat client={user[0]} fun={fetchData} funClose={closeComponent} />)} className='w-44 bg-red-600 p-2 m-2 rounded-xl text-white font-semibold hover:text-black hover:bg-white '>Eliminar Usuario</button>
        </article>

        <article className='p-4 m-4 w-auto'>{activeComponent}</article>

      </section>

    </>
  )
}
