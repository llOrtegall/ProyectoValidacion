import axios from 'axios'
import { useState } from 'react'
import { CloseIcon } from './IconsSvg'

// eslint-disable-next-line react/prop-types
export function EditarUsuario ({ user, fun }) {
  const CloseComponent = fun

  // eslint-disable-next-line react/prop-types
  const { nombre, telefono, cedula, correo } = user[0]
  const [userUpdate, setUserUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [nombre_1, setNombre_1] = useState('')
  const [nombre_2, setNombre_2] = useState('')
  const [apellido_1, setApellido_1] = useState('')
  const [apellido_2, setApellido_2] = useState('')

  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')

  // eslint-disable-next-line react/prop-types
  const palabras = nombre.split(' ')
  switch (palabras.length) {
    case 2:
      var apellido1 = palabras[0]
      var apellido2 = ''
      var nombre1 = palabras[1]
      var nombre2 = ''
      break
    case 3:
      var apellido1 = palabras[0]
      var apellido2 = palabras[1]
      var nombre1 = palabras[2]
      var nombre2 = ''
      break
    case 4:
      var apellido1 = palabras[0]
      var apellido2 = palabras[1]
      var nombre1 = palabras[2]
      var nombre2 = palabras[3]
      break
    default:
      console.log('Número de palabras en el nombre no coincide con los casos esperados.')
  }

  async function handleSubmit (ev) {
    ev.preventDefault()
    setLoading(true)
    axios.put('http://localhost:3000/cliente', { apellido1, apellido2, nombre1, nombre2, nombre_1, nombre_2, apellido_1, apellido_2, tel, email, cedula, telefono, correo })
      .then(response => {
        if (response.status === 200) {
          setUserUpdate(true)
        }
      })
      .then(data => console.log(data.json()))
      .catch(response => {
        if (response.status === 500) {
          console.log('error al actulizar')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const UsuarioActualizado = () => {
    setTimeout(() => {
      CloseComponent()
      location.reload()
    }, 3000)
    return <div className='text-green-800 absolute bottom-0 ml-2 right-auto font-bold '> Usuarios Actualizado Correctamente !!!</div>
  }

  return (
    <>
      <section className='relative'>
        <form className='flex flex-col m-4 p-4 rounded-lg ' onSubmit={handleSubmit}>

          <div className='flex justify-between'>
            <label className='font-bold pr-8'>Apellido 1: </label>
            <input className='mb-2 rounded-lg px-2 ' defaultValue={apellido1} onChange={ev => setApellido_1(ev.target.value)} />
          </div>
          <div className='flex justify-between'>
            <label className='font-bold pr-8'>Apellido 2: </label>
            <input className='mb-2 rounded-lg px-2 ' defaultValue={apellido2} onChange={ev => setApellido_2(ev.target.value)} />
          </div>
          <div className='flex justify-between'>
            <label className='font-bold pr-8'>Nombre 1 : </label>
            <input className='mb-2 rounded-lg px-2 ' defaultValue={nombre1} onChange={ev => setNombre_1(ev.target.value)} />
          </div>
          <div className='flex justify-between'>
            <label className='font-bold pr-8'>Nombre 2: </label>
            <input className='mb-2 rounded-lg px-2 ' defaultValue={nombre2} onChange={ev => setNombre_2(ev.target.value)} />
          </div>

          <div className='flex justify-between'>
            <label className='font-bold pr-8'>Telefono: </label>
            <input className='mb-2 rounded-lg px-2' defaultValue={telefono} onChange={ev => setTel(ev.target.value)} />
          </div>
          <div className='flex justify-between'>
            <label className='font-bold pr-8'>Correo: </label>
            <input className='mb-2 rounded-lg px-2' defaultValue={correo} onChange={ev => setEmail(ev.target.value)} />
          </div>
          {loading
            ? (
              <div>Actualizando Información...</div>
              )
            : (
              <button className='font-semibold bg-green-400 p-2 rounded-xl hover:bg-white hover:text-green-400 '>
                Actualizar Información
              </button>
              )}
          {userUpdate === true
            ? <UsuarioActualizado />
            : null}
        </form>
        <button className='absolute top-0 right-0 hover:bg-red-700 hover:rounded-full hover:text-white' onClick={CloseComponent}><CloseIcon /></button>
      </section>

    </>

  )
}
