import { useContext, useState } from 'react'
import { AuthContext } from '../auth/AuthContext'
import axios from 'axios'
import Cookies from 'js-cookie'

export const LoginForm = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const { setUser: setAuthUser } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit (ev) {
    ev.preventDefault()
    try {
      const response = await axios.post('/login', { user, password })
      if (response.status === 200) {
        const { apellidos, nombre, username, correo } = response.data
        setAuthUser({ user: username, name: nombre, lastName: apellidos, email: correo })
        Cookies.set('token', response.data.token, { expires: 1 })
      } else {
        setErrorMessage(response.data)
        setTimeout(() => {
          setErrorMessage('')
        }, 2000)
      }
    } catch (error) {
      if (error.message === 'Network Error' || error.message.includes('net::')) {
        setErrorMessage('Error de red: no se pudo conectar al servidor')
      } else if (error.response) {
        setErrorMessage(error.response.data.error)
      } else {
        setErrorMessage('Ocurrió un error desconocido')
      }
      setTimeout(() => {
        setErrorMessage('')
      }, 2000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='bg-white w-96 h-2/3 rounded-xl p-12 shadow-2xl relative flex flex-col gap-8 justify-between'>
      <h1 className='text-orange-600 font-bold text-3xl text-center'>ChatBot Validator</h1>
      <br />
      {/* // TODO: usuario */}
      <input type='text' placeholder='Usuario | Eje: CP1118333444' className='border-b-2 p-2' required onChange={ev => setUser(ev.target.value)} />
      {/* // TODO: contraseña */}
      <input type='password' placeholder='Contraseña | Eje: CP***' className='border-b-2 p-2' required onChange={ev => setPassword(ev.target.value)} />
      <a className='text-orange-500 text-sm font-semibold text-end pt-2 pb-4'>Olvidaste tu contraseña</a>
      <button className='bg-orange-400 w-full rounded-lg p-3 text-white text-sm shadow-md hover:bg-green-100 hover:text-black'>Iniciar Sesión</button>
      {errorMessage ? <p className='absolute bottom-24 left-28 text-red-600 font-semibold'>{errorMessage}</p> : null}
      <div className='pt-8'>
        <p className='text-xs'>¿No tienes una cuenta? <span className='font-semibold'>Regístrate</span></p>
      </div>
    </form>
  )
}
