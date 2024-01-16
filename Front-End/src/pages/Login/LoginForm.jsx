import { GetUserCookie } from '../../utils/funtions.js'
import { useAuth } from '../../Auth/AuthContext.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://172.20.1.160:3000/login', { user: username, password })
      if (response.status === 200) {
        const { data } = response
        document.cookie = `bodega=${data.token}`
        const user = await GetUserCookie(data.token)
        login(data.auth, user)
        navigate('/')
      }
    } catch (error) {
      if (error.message === 'Network Error') {
        return setError('Servidor No Disponible y/o Error De Conexión, Consulte Con El Administrador')
      }
      setError(error.response.data.error)
    } finally {
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  return (
    <>
      <section className='w-full h-screen flex items-center justify-center fondo relative'>
        <form onSubmit={handleSubmit}
          className='flex flex-col w-96 h-2/3 bg-white rounded-2xl shadow-2xl px-10 justify-around'>
          <h1 className='text-orange-600 font-bold text-3xl text-center pt-8 pb-6'>ChatBot Validator</h1>
          <input type='text' placeholder='Usuario | Eje: CP1118333444'
            className='border-b-2 p-2'
            onChange={ev => setUsername(ev.target.value)} />
          <input type='password' placeholder='Contraseña | Eje: CP***' className='border-b-2 p-2'
            onChange={ev => setPassword(ev.target.value)} />
          <Link className='text-orange-500 text-sm font-semibold text-end pt-2 pb-4 hover:underline'
            to='/chat_bot/forgot-password'> Olvidaste tu contraseña</Link>
          <button className='bg-orange-400 w-full rounded-lg p-3 text-white text-sm shadow-md hover:bg-green-100 hover:text-black'>Iniciar Sesión</button>

          {error
            ? <p className='absolute right-0 left-0 lg:bottom-10 2xl:bottom-28 text-red-600 font-semibold text-center'>{error}</p>
            : null
          }
        </form>

      </section>
    </>

  )
}
