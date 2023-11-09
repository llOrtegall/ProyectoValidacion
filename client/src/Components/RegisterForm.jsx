import axios from 'axios'
import { useState } from 'react'

export function RegisterForm ({ fun }) {
  const [names, setNames] = useState('')
  const [lastNames, setLastNames] = useState('')
  const [document, setDocument] = useState('')
  const [message, setMessage] = useState('')
  const handleClick = fun

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    try {
      const response = await axios.post('/register', { names, lastNames, document })
      if (response.status === 200) {
        setMessage(response.data.message)
      } else if (response.status === 201) {
        setMessage(response.data.message)
      }
      setTimeout(() => {
        handleClick()
      }, 4200)
    } catch (error) {
      setMessage(error.response.data.error.message)
    }
    setTimeout(() => {
      setMessage('')
    }, 4000)
  }

  return (
    <form onSubmit={handleSubmit} className='bg-white w-96 h-2/3 rounded-xl p-12 shadow-2xl relative flex flex-col gap-8 justify-between'>
      <h1 className='text-orange-600 font-bold text-3xl text-center'>ChatBot Validator</h1>
      <br />
      {/* // TODO: usuario */}
      <input type='text' placeholder='Nombres' className='border-b-2 p-2' required onChange={ev => setNames(ev.target.value)} />
      {/* // TODO: contraseña */}
      <input type='text' placeholder='Apellidos' className='border-b-2 p-2' required onChange={ev => setLastNames(ev.target.value)} />
      {/* // TODO: documento */}
      <input type='text' placeholder='N° Documento' className='border-b-2 p-2' required onChange={ev => setDocument(ev.target.value)} />
      <button className='bg-orange-400 w-full rounded-lg p-3 text-white text-sm shadow-md hover:bg-green-100 hover:text-black'>Registrarse</button>
      {/* {errorMessage ? <p className='absolute bottom-24 left-28 text-red-600 font-semibold'>{errorMessage}</p> : null} */}
      <div className='pt-8'>
        <p className='text-xs'>¿Ya Estás Registrado? <span className='font-semibold'>Iniciar Sesión</span></p>
      </div>
      {message === 'Usuario Registrado Correctamente'
        ? <p className='absolute bottom-20 left-16 text-green-600 font-semibold'>{message}</p>
        : <p className='absolute bottom-20 left-16 text-red-600 font-semibold'>{message} </p>}
    </form>
  )
}
