import axios from "axios"
import { useState } from "react"

export function CreatedItems() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [item, setItem] = useState({
    nombre: '',
    descripcion: '',
    placa: '',
    serial: '',
    estado: ''
  })

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/createItem', item)
      .then(res => {
        console.log(res)
        setItem({
          nombre: '',
          descripcion: '',
          placa: '',
          serial: '',
          estado: ''
        })
        setMessage(res.data.message)
        setTimeout(() => {
          setMessage('')
        }, 4000)
      })
      .catch(err => {
        console.log(err)
        setError(err.response.data.error)
        setTimeout(() => {
          setError('')
        }, 4000)
      })
  }

  return (
    <main className="w-full h-full">
      <form className="grid grid-cols-3 p-8 m-8 gap-3 rounded-lg bg-blue-200" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold text-gray-700">Nombre</label>
          <input type="text" name="nombre" value={item.nombre} onChange={handleChange}
            placeholder="Mouse USB / Teclado USB ..."
            className="px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold text-gray-700">Descripción</label>
          <input type="text" name="descripcion" value={item.descripcion} onChange={handleChange} placeholder="Genius - Teclado Gamer ..."
            className="px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold text-gray-700">Placa</label>
          <input type="text" name="placa" value={item.placa} onChange={handleChange}
            placeholder="MI-0001 / MA-0002 ..."
            className="px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold text-gray-700">Serial</label>
          <input type="text" name="serial" value={item.serial} onChange={handleChange}
            placeholder="XFGRTWE675 / SN:JSURY6373 ..."
            className="px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold text-gray-700">Estado</label>
          <select name="estado" value={item.estado} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Selecciona un estado</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Bueno">Bueno</option>
            <option value="Malo">Malo</option>
            <option value="Regular">Regular</option>
          </select>
        </div>
        <button className="w-44 h-10 text-md font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700">
          Crear
        </button>
      </form>
      <div className="w-full flex items-center justify-center">
        {message && <p className="text-green-500 font-semibold">{message}</p>}
        {error && <p className="text-red-500 font-semibold">{error}</p>}
      </div>

    </main>
  )
}
