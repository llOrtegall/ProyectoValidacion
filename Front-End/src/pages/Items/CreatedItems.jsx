import { SelectComponent } from '../../components/SelectComponent'
import { MessageDisplay } from '../../components/MessageDisplay'
import { useState } from 'react'
import axios from 'axios'

export function CreatedItems () {
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
    axios.post('http://localhost:3030/createItem', item)
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
        localStorage.removeItem('items')
        localStorage.removeItem('itemsConBodega')
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
    <main className="h-[93vh] overflow-auto">

      <section>
        <form className="grid grid-cols-3 p-8 m-8 gap-3 rounded-lg bg-blue-400 place-items-center" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 font-semibold text-gray-700">Nombre</label>
            <SelectComponent fun={handleChange} />
          </div>
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 font-semibold text-gray-700">Descripción | Marca</label>
            <input type="text" name="descripcion" value={item.descripcion} onChange={handleChange} placeholder="Genius - Teclado Gamer ..."
              className="px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 font-semibold text-gray-700">Placa</label>
            <input type="text" name="placa" value={item.placa} onChange={handleChange}
              placeholder="MI-0001 / MA-0002 ..."
              className="px-3 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 font-semibold text-gray-700">Serial</label>
            <input type="text" name="serial" value={item.serial} onChange={handleChange}
              placeholder="XFGRTWE675 / SN:JSURY6373 ..."
              className="px-3 py-2 border border-gray-300 rounded-md uppercase" required />
          </div>
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 font-semibold text-gray-700">Estado</label>
            <select name="estado" value={item.estado} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-md">
              <option value="">Selecciona un estado</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Bueno">Bueno</option>
              <option value="Malo">Malo</option>
              <option value="Regular">Regular</option>
            </select>
          </div>
          <button className="w-52 h-10 text-md font-semibold text-white bg-blue-600 rounded-md hover:bg-white hover:text-black">
            Crear Item
          </button>
        </form>
      </section>

      <MessageDisplay message={message} error={error} />
    </main>
  )
}
