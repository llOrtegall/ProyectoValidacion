import axios from 'axios'
import { useState } from 'react'
import { CloseIcon } from './IconsSvg'
import { separarNombre } from '../services/funtionsReutilizables'

export function EditarUsuario ({ user, fun }) {
  const CloseComponent = fun
  const { nombre, telefono, cedula, correo } = user[0]

  const [userUpdate, setUserUpdate] = useState(false)
  const [loading, setLoading] = useState(false)

  const { nombre1, nombre2, apellido1, apellido2 } = separarNombre(nombre)
  const [userObject, setUserObject] = useState({ names1: nombre1, names2: nombre2, names3: apellido1, names4: apellido2, tel: telefono, documen: cedula, email: correo })

  async function handleUpdateClick () {
    const form = document.querySelector('form')
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    setUserObject(data)

    try {
      const response = await axios.put('http://localhost:3000/cliente', { userObject })
      if (response.status === 200) {
        setUserUpdate(true)
      }
    } catch (error) {
      console.log('error al actualizar', error)
    } finally {
      setLoading(false)
    }
  }

  const UsuarioActualizado = () => {
    setTimeout(() => {
      CloseComponent()
      window.location.reload()
    }, 3000)
    return (
      <div className='text-green-800 absolute bottom-0 ml-2 right-auto font-bold '>
        Usuarios Actualizado Correctamente !!!
      </div>
    )
  }

  return (
    <>
      <section className='relative'>
        <form className='flex flex-col m-4 p-4 rounded-lg '>
          <div className='flex justify-between'>
            <label className='font-bold pr-8'>Nombre 1 : </label>
            <input
              className='mb-2 rounded-lg px-2 '
              defaultValue={nombre1}
              name='names1'
            />
          </div>
          <div className='flex justify-between'>
            <label className='font-bold pr-8'>Nombre 2: </label>
            <input
              className='mb-2 rounded-lg px-2 '
              defaultValue={nombre2}
              name='names2'
            />
          </div>
          <div className='flex justify-between'>
            <label className='font-bold pr-8'>Apellido 1: </label>
            <input
              className='mb-2 rounded-lg px-2 '
              defaultValue={apellido1}
              name='names3'
            />
          </div>
          <div className='flex justify-between'>
            <label className='font-bold pr-8'>Apellido 2: </label>
            <input
              className='mb-2 rounded-lg px-2 '
              defaultValue={apellido2}
              name='names4'
            />
          </div>
          <div className='flex justify-between'>
            <label className='font-bold pr-8'>Telefono: </label>
            <input
              className='mb-2 rounded-lg px-2'
              defaultValue={telefono}
              name='tel'
            />
          </div>
          <div className='flex justify-between'>
            <label className='font-bold pr-8'>Correo: </label>
            <input
              className='mb-2 rounded-lg px-2'
              defaultValue={correo}
              name='email'
            />
          </div>
        </form>
        {loading
          ? (
            <div>Actualizando Información...</div>
            )
          : (
            <button className='font-semibold bg-green-400 p-2 rounded-xl hover:bg-white hover:text-green-400 ' onClick={handleUpdateClick}>
              Actualizar Información
            </button>
            )}
        {userUpdate && <UsuarioActualizado />}
        <button
          className='absolute top-0 right-0 hover:bg-red-700 hover:rounded-full hover:text-white'
          onClick={CloseComponent}
        >
          <CloseIcon />
        </button>
      </section>
    </>
  )
}
