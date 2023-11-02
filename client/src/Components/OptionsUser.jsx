import axios from 'axios'
import { useState, useEffect } from 'react'
import { separarNombre } from '../services/funtionsReutilizables'
import { CloseIcon } from './IconsSvg'

export function CrearClienteFiel ({ client, fun, fun2 }) {
  const { cedula, nombre, telefono, correo } = client
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [responseOk, setResponseOk] = useState(null)
  const handleComponentClose = fun
  const fetchData = fun2

  const sendCreateClient = () => {
    setLoading(true)
    axios.post('/newCF', { cedula, nombre, telefono, correo })
      .then(res => {
        setResponseOk(res.status)
        setLoading(false)
        setTimeout(() => {
          fetchData()
          handleComponentClose()
        }, 5000)
      })
      .catch(err => {
        setError(err.response.data.message)
        setLoading(false)
      })
  }

  return (
    <article className='bg-blue-500 relative rounded-lg '>
      <section className='flex p-8 m-4'>
        <div className=''>
          <dd className='text-white '><span className='text-black font-semibold pr-2'>Nombre: </span>{nombre}</dd>
          <dd className='text-white '><span className='text-black font-semibold pr-2'>N° Documento: </span>{cedula}</dd>
          <dd className='text-white '><span className='text-black font-semibold pr-2'>Tel / Cel: </span>{telefono}</dd>
          <dd className='text-white '><span className='text-black font-semibold pr-2'>Correo: </span>{correo}</dd>
          <button onClick={sendCreateClient} className='bg-green-500 rounded-md text-white font-semibold w-full p-2 mt-4 hover:bg-white hover:text-black'>
            Crea Cliente Fiel
          </button>
          {loading && <p className='text-center'>Creando Usuario ...</p>}
          {error && <p>Error:{error}</p>}
          {responseOk && <p className='text-center'> USUARIO CREADO </p>}
        </div>
      </section>
      <button className='absolute top-0 right-0 rounded-full hover:bg-red-500 hover:text-white' onClick={handleClick}>
        <CloseIcon />
      </button>
    </article>
  )
}

export function EditarClienteChat ({ client, fun, fun2 }) {
  const { cedula, nombre, telefono, correo } = client
  const { nombre1, nombre2, apellido1, apellido2 } = separarNombre(nombre)
  const [updateUser, setUpdateUser] = useState({})
  const [status, setStatus] = useState(null)
  const handleComponentClose = fun
  const fetchData = fun2

  function StatusMessage ({ status }) {
    if (status === 'loading') {
      return <div className='text-center font-semibold text-blue-700'>Cargando...</div>
    } else if (status === 'success') {
      return <div className='text-center ext-center font-semibold text-green-800 '>La información del usuario ha sido actualizada.</div>
    } else if (status === 'error') {
      return <div className='text-center font-semibold text-red-700'>Ha ocurrido un error al actualizar la información del usuario.</div>
    } else {
      return null
    }
  }

  useEffect(() => {
    setUpdateUser({ nombre1, nombre2, apellido1, apellido2, telefono, correo, cedula })
  }, [nombre1, nombre2, apellido1, apellido2, telefono, correo, cedula])

  const handleChange = ({ target: { name, value } }) => {
    setUpdateUser(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await axios.put('/cliente', { updateUser })
      if (res.status === 200) {
        setStatus('success')
        setTimeout(() => {
          fetchData()
          handleComponentClose()
        }, 3000)
      } else if (res.status === 'error') {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='bg-gray-400 p-6 rounded-lg'>
        <div className='grid grid-cols-4 gap-2'>
          <label className='px-2 font-semibold'> Nombre 1: </label>
          <input className='p-2 rounded-md w-28' type='text' name='nombre1' value={updateUser.nombre1 || ''} onChange={handleChange} required />
          <label className='px-2 font-semibold'> Nombre 2: </label>
          <input className='p-2 rounded-md w-28' type='text' name='nombre2' value={updateUser.nombre2 || ''} onChange={handleChange} />
          <label className='px-2 font-semibold'> Apellido 1: </label>
          <input className='p-2 rounded-md w-28' type='text' name='apellido1' value={updateUser.apellido1 || ''} onChange={handleChange} required />
          <label className='px-2 font-semibold'> Apellido 2: </label>
          <input className='p-2 rounded-md w-28' type='text' name='apellido2' value={updateUser.apellido2 || ''} onChange={handleChange} />
          <label className='px-2 font-semibold'> Correo: </label>
          <input className='p-2 rounded-md w-52' type='text' name='correo' value={updateUser.correo || ''} onChange={handleChange} />
          <label className='px-2 font-semibold'> Telefono: </label>
          <input className='p-2 rounded-md w-28' type='text' name='telefono' value={updateUser.telefono || ''} onChange={handleChange} />
        </div>
        <button type='submit' className='p-2 bg-green-400 w-40 rounded-md shadow-md'>Actualizar</button>
        <StatusMessage status={status} />
      </form>

      <button className='absolute top-0 right-0 rounded-full hover:bg-red-500 hover:text-white'>
        <CloseIcon />
      </button>
    </>
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
