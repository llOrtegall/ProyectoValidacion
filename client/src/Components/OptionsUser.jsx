import axios from 'axios'
import { useState } from 'react'

export function CrearClienteFiel ({ client }) {
  const { cedula, nombre, telefono, correo } = client
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [responseOk, setResponseOk] = useState(null)

  const sendCreateClient = () => {
    setLoading(true)
    axios.post('/newCF', { cedula, nombre, telefono, correo })
      .then(res => {
        setResponseOk(res.status)
        setLoading(false)
      })
      .catch(err => {
        setError(err.response.data.message)
        setLoading(false)
      })
  }

  return (
    <article className='bg-blue-500 flex w-90 h-full rounded-lg'>
      <section>
        <div className='h-full flex flex-col m-8'>
          <dd className='text-white '><span className='text-black font-semibold pr-2'>Nombre: </span>{nombre}</dd>
          <dd className='text-white '><span className='text-black font-semibold pr-2'>N° Documento: </span>{cedula}</dd>
          <dd className='text-white '><span className='text-black font-semibold pr-2'>Tel / Cel: </span>{telefono}</dd>
          <dd className='text-white '><span className='text-black font-semibold pr-2'>Correo: </span>{correo}</dd>
          <button onClick={sendCreateClient} className='bg-green-500 rounded-md text-white font-semibold w-full p-2  hover:bg-white hover:text-black'>
            Crea Cliente Fiel
          </button>
          {loading && <p className='text-center'>Creando Usuario ...</p>}
          {error && <p>Error:{error}</p>}
          {responseOk && <p className='text-center'> USUARIO CREADO </p>}
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
