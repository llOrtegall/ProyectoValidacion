import axios from 'axios'
import { useState } from 'react'
import { separarNombre } from '../services/funtionsReutilizables'

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
  const { cedula, nombre, telefono, correo } = client
  const { nombre1, nombre2, apellido1, apellido2 } = separarNombre(nombre)
  const [updateUser, setUpdateUser] = useState({ nombre1, nombre2, apellido1, apellido2, telefono, correo, cedula })

  const handleChange = (e) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí puedes hacer la llamada a la API para actualizar la información del usuario
    axios.put('/cliente', { updateUser })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    console.log(updateUser)
  }

  return (
    <article className='bg-yellow-500 p-2 m-2 w-full'>
      <form className='flex' onSubmit={handleSubmit}>
        <div className='flex flex-col p-2 m-2'>
          <label> Nombre 1: </label>
          <input type='text' name='nombre1' defaultValue={nombre1} value={updateUser.nombre1} onChange={handleChange} required />
          <label> Apellido 1: </label>
          <input type='text' name='apellido1' defaultValue={apellido1} value={updateUser.apellido1} onChange={handleChange} required />
          <label> Telefono: </label>
          <input type='text' name='telefono' defaultValue={telefono} value={updateUser.telefono} onChange={handleChange} />
        </div>
        <div className='flex flex-col p-2 m-2'>
          <label> Nombre 2: </label>
          <input type='text' name='nombre2' defaultValue={nombre2} value={updateUser.nombre2} onChange={handleChange} />
          <label> Apellido 2: </label>
          <input type='text' name='apellido2' defaultValue={apellido2} value={updateUser.apellido2} onChange={handleChange} />
          <label> Correo: </label>
          <input type='text' name='correo' defaultValue={correo} value={updateUser.correo} onChange={handleChange} />
        </div>
        <button type='submit'>Actualizar</button>
      </form>
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
