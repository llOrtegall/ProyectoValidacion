import { SuccesIcon, WarningIcon } from '../../components/Icons.jsx'
import { useState } from 'react'
import axios from 'axios'

export function CreatedBodega () {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // nombre, sucursal, direccion
  const [item, setItem] = useState({
    nombre: '',
    sucursal: '',
    direccion: ''
  })

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/createBodega', item)
      .then(res => {
        setMessage(res.data.message)
        console.log(res)
        setItem({
          nombre: '',
          sucursal: '',
          direccion: ''
        }) // limpiar el formulario
        setTimeout(() => {
          setMessage('')
        }, 4000)
      })
      .catch(err => {
        setError(err.response.data.error)
        console.log(err)
        setTimeout(() => {
          setError('')
        }, 4000)
      })
  }

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <form className="flex flex-col items-center p-8 m-8 gap-3 rounded-lg bg-blue-400 w-1/2" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col mb-4">
          <label className="mb-2 font-semibold text-gray-700">Nombre Bodega | PDV</label>
          <input type="text" name="nombre" value={item.nombre} onChange={handleChange}
            placeholder="Bodega Principal ... | PDV 12 ..."
            className="px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="w-full flex flex-col mb-4">
          <label className="mb-2 font-semibold text-gray-700">N° Sucursal</label>
          <input type="text" name="sucursal" value={item.sucursal} onChange={handleChange} placeholder="401923 | 401924 ..."
            className="px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="w-full flex flex-col mb-4">
          <label className="mb-2 font-semibold text-gray-700">Dirección</label>
          <input type="text" name="direccion" value={item.direccion} onChange={handleChange}
            placeholder="Cra 4 # 4-56 ... | Calle 5 # 5-67 ..."
            className="px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        <button className="text-md p-2 w-44  font-semibold text-white bg-blue-700 rounded-md hover:bg-white hover:text-black">
          Crear Bodega | PDV
        </button>
      </form>
      <footer>
      {message &&
            <div className='flex gap-2'>
              <figure className='bg-green-600 text-white font-bold flex items-center justify-center text-center px-2 rounded-md'>
                <SuccesIcon />
              </figure>
              <p className="text-center bg-green-600 text-white font-semibold p-2 rounded-md">
                {message}
              </p>
            </div>
          }
          {error &&
            <div className='flex gap-2'>
              <figure className='bg-red-400 text-white flex items-center justify-center text-center px-2 rounded-md'>
                <WarningIcon />
              </figure>
              <p className="text-center bg-red-400 text-white font-semibold p-2 rounded-md">
                {error}
              </p>
            </div>
          }
      </footer>
    </main>
  )
}