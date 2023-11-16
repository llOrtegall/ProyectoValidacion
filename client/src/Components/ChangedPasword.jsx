import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../auth/AuthContext'

export function ChangedPassword ({ username }) {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { logout } = useContext(AuthContext)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleChangePassword = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/changePassword', {
        username,
        oldPassword,
        newPassword,
        confirmPassword
      })
      setMessage(response.data.message)
      setTimeout(() => {
        setMessage('')
        logout()
      }, 1500)
      // Handle the response here
    } catch (error) {
      setError(error.response.data.error)
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  return (
    <section className='bg-slate-600 shadow-2xl w-96 h-96 p-4 rounded-lg flex items-center justify-center '>
      <form onSubmit={handleChangePassword} className='flex flex-col items-center'>
        <h2 className='text-center text-xl font-bold uppercase text-white'> Cambiar Contraseña </h2>
        <p className='py-2 font-bold text-yellow-300'>Usuario: <span className='text-green-400'>{username}</span></p>
        <input
          type='password' className='p-2 my-2 rounded-md w-full shadow-md'
          value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
          placeholder='Contraseña Actual' required
        />
        <input
          type='password' className='p-2 my-2 rounded-md w-full shadow-md'
          value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
          placeholder='Nueva Contraseña' required
        />
        <input
          type='password' className='p-2 my-2 rounded-md w-full shadow-md'
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Confirmar Contraseña Nueva' required
        />
        <button type='submit' className='bg-green-500 p-2 rounded-md shadow-lg text-white font-semibold uppercase mt-4 w-56 hover:text-green-700 hover:bg-white'>
          Cambiar Contraseña
        </button>

        {message && <p className='text-green-400 font-semibold absolute bottom-4'>{message}</p>}
        {error && <p className='text-red-400 font-semibold absolute bottom-4'>{error}</p>}
      </form>
    </section>
  )
}
