import { AuthContext } from '../auth/AuthContext'
import { useState, useContext } from 'react'
import axios from 'axios'

export const Login = () => {
  // Estado para los campos de usuario y contraseña
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  // Estado para el mensaje de error
  const [errorMessage, setErrorMessage] = useState('')

  // Contexto de autenticación
  const { setUser: setAuthUser } = useContext(AuthContext)

  // Función para manejar el inicio de sesión
  async function handleLogin (ev) {
    ev.preventDefault()

    try {
      const response = await axios.post('/login', { user, password })

      if (response.status === 200) {
        const { apellidos, id, nombres, username } = response.data
        setAuthUser({ name: nombres, lastName: apellidos, id, usuario: username })
      } else {
        setErrorMessage(response.data)
        setTimeout(() => {
          setErrorMessage('')
        }, 3000)
      }
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  return (
    <section className='flex justify-center items-center h-screen w-screen bg-blue-200 '>
      <form className='w-80' onSubmit={handleLogin}>
        <h1 className='text-center font-semibold pb-4 text-xl'>Iniciar Sesión</h1>
        <input
          value={user} onChange={ev => setUser(ev.target.value)} type='text' placeholder='Usuario'
          className='block w-full rounded-md  border p-2 mb-2' required
        />
        <input
          value={password} onChange={ev => setPassword(ev.target.value)} type='password' placeholder='Contraseña'
          className='block w-full rounded-md border p-2 mb-2' required
        />
        <button className='bg-blue-500 text-white block w-full rounded-md p-2 font-semibold shadow-lg'>
          Iniciar Sesión
        </button>
        <article className='w-auto mt-12 text-center text-red-700 font-medium'>
          {errorMessage}
        </article>
      </form>
    </section>
  )
}
