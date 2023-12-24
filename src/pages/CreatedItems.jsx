import { useState } from "react"

export function CreatedItems() {
  const [item, setItem] = useState({
    nombre: '',
    descripcion: '',
    placa: '',
    serial: '',
    estado: '',
    bodega: ''
  })

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(item)
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
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold text-gray-700">Bodega</label>
          <input type="text" name="bodega" value={item.bodega} onChange={handleChange}
            placeholder="Bodega 1 / Bodega 2 ..."
          className="px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <button className="py-2 text-md font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700">
          Crear
        </button>
      </form>
    </main>
  )
}
