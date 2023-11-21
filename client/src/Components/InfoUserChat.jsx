import { useState, useEffect } from 'react'
import { CrearClienteFiel, EditarClienteChat, SolicitarEliminacion } from './OptionsUser.jsx'
import { InfoIcon } from './IconsSvg'
import { Button } from './Button.jsx'

export function InfoUserChat ({ user, fun2, fun3 }) {
  const [activeComponent, setActiveComponent] = useState(null)
  const { nombre, cedula, telefono, correo, telwhats } = user
  const fetchData = fun2
  const handleClose = fun3

  const closeComponent = () => {
    setActiveComponent(null)
  }

  const components = {
    EditarClienteChat: <EditarClienteChat client={user} funClose={closeComponent} fun2={fetchData} fun3={handleClose} />,
    CrearClienteFiel: <CrearClienteFiel client={user} funClose={closeComponent} fun2={fetchData} fun3={handleClose} />,
    SolicitarEliminacion: <SolicitarEliminacion client={user} funClose={closeComponent} fun2={fetchData} />
  }

  const handleButtonClick = (componentName) => {
    setActiveComponent(components[componentName])
  }

  useEffect(() => {
    setActiveComponent(null)
  }, [user])

  return (
    <section className='bg-slate-600 rounded-xl flex items-center justify-around p-2 m-2 h-80 md:text-xs xl:text-md xl:h-60'>
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
        <Button color='blue' onClick={() => handleButtonClick('EditarClienteChat')}>Editar Usuario</Button>
        <Button color='green' onClick={() => handleButtonClick('CrearClienteFiel')}>Agregar Usuario</Button>
        <Button color='red' onClick={() => handleButtonClick('SolicitarEliminacion')}>Eliminar</Button>
      </article>

      <article className='p-4 m-4 w-5/12'>{activeComponent}</article>
    </section>
  )
}
