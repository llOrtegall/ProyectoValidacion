import { GetUserCookie } from '../../utils/funtions.js'
import { useAuth } from '../../Auth/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
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
      const response = await axios.post('http://localhost:3050/login', { user: username, password })
      if (response.status === 200) {
        document.cookie = `bodega=${response.data.token}`
        const user = await GetUserCookie(response.data.token)
        login(user)
        navigate('/home')
      }
    } catch (error) {
      console.log(error)

      if (error.message === 'Network Error') {
        return setError('Servidor No Disponible y/o Error De Conexión, Consulte Con El Administrador')
      }
      setError(error.response.data.error)
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  return (
    <>
      <section className='w-full h-screen flex items-center justify-center relative bg-slate-700'>

        <form onSubmit={handleSubmit}
          className='flex flex-col w-[450px] h-auto rounded-2xl shadow-2xl px-10 py-20  justify-around bg-slate-400 border border-gray-500'>
          <figure className='mb-12 flex items-center justify-center'>
            <img src="../public/gane.png" width={150} alt="" />
          </figure>
          <article className='flex flex-col mb-20'>
            <label className='font-semibold mb-2 text-white'>Usuario:</label>
            <input type='text' placeholder='Eje: CP1118333444'
              className='p-2.5 mb-10 rounded-md bg-slate-500 text-white'
              onChange={ev => setUsername(ev.target.value)} />
            <label className='font-semibold mb-2 text-white'>Contraseña:</label>
            <input type='password' placeholder='**************'
              className='p-2.5 rounded-md bg-slate-500 text-white'
              onChange={ev => setPassword(ev.target.value)} />
          </article>
          <button className='bg-blue-600 w-full rounded-lg p-3 text-white font-semibold text-sm shadow-md hover:bg-blue-700 '>Iniciar Sesión</button>

          {error
            ? <p className='absolute right-0 left-0 lg:bottom-10 2xl:bottom-28 text-red-600 font-semibold text-center'>{error}</p>
            : null
          }
        </form>

      </section>
    </>

  )
}
