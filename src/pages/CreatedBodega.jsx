import { useState } from "react"

export function CreatedBodega() {

  // nombre, sucursal, direccion
  const [item, setItem] = useState({
    nombre: '',
    sucursal: '',
    direccion: '',
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
      <form className="flex flex-col items-center p-8 m-8 gap-3 rounded-lg bg-blue-200" onSubmit={handleSubmit}>
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
       
        <button className="text-md p-2 w-44  font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700">
          Crear
        </button>
      </form>
    </main>
  )

}