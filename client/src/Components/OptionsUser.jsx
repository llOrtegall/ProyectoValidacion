export function CrearClienteFiel ({ client }) {
  const { cedula, nombre, telefono, correo } = client
  return (
    <article className='bg-green-300 flex w-90'>
      <section>
        <div className='items-center m-4 w-80'>
          <dd className='text-white '><span className='text-black font-semibold pr-2'>Nombre: </span>{nombre}</dd>
          <dd className='text-white '><span className='text-black font-semibold pr-2'>N° Documento: </span>{cedula}</dd>
          <dd className='text-white '><span className='text-black font-semibold pr-2'>Tel / Cel: </span>{telefono}</dd>
          <dd className='text-white '><span className='text-black font-semibold pr-2'>Correo: </span>{correo}</dd>
        </div>
      </section>
    </article>
  )
}

export function EditarClienteChat ({ client }) {
  console.log(client)
  return (
    <article>
      <h1>Editar Cliente Chat</h1>
    </article>
  )
}

export function EliminarClienteChat ({ client }) {
  console.log(client)
  return (
    <article>
      <h1>Eliminar Cliente Chat</h1>
    </article>
  )
}
