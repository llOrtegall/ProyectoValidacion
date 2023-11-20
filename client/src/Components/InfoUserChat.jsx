import { useState, useEffect } from 'react'
import { InfoIcon } from './IconsSvg'
import { CrearClienteFiel, EditarClienteChat, SolicitarEliminacion } from './OptionsUser.jsx'

export function InfoUserChat ({ user }) {
  const { cedula, nombre, telefono, correo, telwhats } = user
  const [activeComponent, setActiveComponent] = useState(null)

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
    <section className='bg-slate-600 rounded-xl flex items-center justify-around p-2 m-2 h-80'>
      <article className='flex w-4/12 items-center'>
        <div className='p-2'>
          <InfoIcon className='text-white' />
        </div>
        <div className='w-full'>
          <dd className='text-white w-full'> <span className='text-green-200 font-semibold pr-2'>Nombres: </span>{nombre}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>N° Documento: </span>{cedula}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>Tel / Cel: </span>{telefono}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>Correo: </span>{correo}</dd>
          <dd className='text-white w-full'><span className='text-green-200 font-semibold pr-2'>Registro: </span>{telwhats}</dd>
        </div>
      </article>

      <article className='flex flex-col w-2/12'>
        <button onClick={() => handleButtonClick(<EditarClienteChat client={user} funClose={closeComponent} />)} className=' bg-yellow-500 p-2 m-2 rounded-xl text-white font-semibold hover:text-black hover:bg-white '>Editar Usuario</button>
        <button onClick={() => handleButtonClick(<CrearClienteFiel client={user} funClose={closeComponent} />)} className='bg-green-500 p-2 m-2 rounded-xl text-white font-semibold hover:text-black hover:bg-white '>Agregar Usuario</button>
        <button onClick={() => handleButtonClick(<SolicitarEliminacion client={user} funClose={closeComponent} />)} className='bg-red-500 p-2 m-2 rounded-xl text-white font-semibold hover:text-black hover:bg-white '>Eliminar</button>
      </article>

      <article className='p-4 m-4 w-5/12'>{activeComponent}</article>
    </section>
  )
}
