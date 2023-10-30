import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../auth/AuthContext'

export const Login = () => {
  // TODO: Para Logín
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { setUser: setAuthUser } = useContext(AuthContext)

  async function iniciarSession (ev) {
    ev.preventDefault()

    axios.post('/login', { user, password })
      .then(response => {
        if (response.status === 200) {
          const { apellidos, id, nombres, username } = response.data
          setAuthUser({ name: nombres, lastName: apellidos, id, usuario: username })
        } else {
          setErrorMessage(response.data)
        }
      })
      .catch(res => {
        setErrorMessage(res.response.data.error)
      })
  }

  return (
    <section className='flex justify-center items-center h-screen w-screen bg-blue-200 '>
      <form className='w-80' onSubmit={iniciarSession}>
        <h1 className='text-center font-semibold pb-4 text-xl'>Iniciar Session</h1>
        <input
          value={user} onChange={ev => setUser(ev.target.value)} type='text' placeholder='Usuario'
          className='block w-full rounded-md  border p-2 mb-2' required
        />
        <input
          value={password} onChange={ev => setPassword(ev.target.value)} type='password' placeholder='Contraseña'
          className='block w-full rounded-md border p-2 mb-2' required
        />
        <button className='bg-blue-500 text-white block w-full rounded-md p-2 font-semibold shadow-lg'>
          Iniciar Session
        </button>
        <article className='w-auto mt-12 text-center text-red-700 font-medium'>
          {errorMessage}
        </article>
      </form>
    </section>

  )
}
