import axios from "axios"
import { useEffect, useState } from "react"

export function Bodegas() {
  const [bodegas, setBodegas] = useState([])
  const [search, setSearch] = useState('')

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const filteredItems = bodegas.filter(item =>
    item.nombre.toLowerCase().includes(search.toLowerCase()) ||
    item.sucursal.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    axios.get('/getBodegas')
      .then(response => {
        setBodegas(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <main>
      <section className="flex items-center justify-center gap-6 p-2 bg-blue-500  rounded-md shadow-lg m-2">
        <p className=""><span className="font-semibold pr-2">Filtrar:</span>| Sucursal | Nombre |</p>
        <input type="text" value={search} onChange={handleSearchChange} placeholder="Buscar Bodega..." className="bg-slate-100 w-64 p-2 rounded-md" />
      </section>
      {
        filteredItems.map(bodega => (
          <article key={bodega._id} className="flex justify-between items-center p-4 border border-gray-400 rounded shadow-lg">
            <div>
              <h2 className="font-semibold">{bodega.nombre}</h2>
              <p><span className="font-semibold">Sucursal: </span> {bodega.sucursal}</p>
              <p><span className="font-semibold">Dirección: </span>{bodega.direccion}</p>
            </div>
            <div>
              <p>Items Asignados</p>
              <p className="text-center">{bodega.items.length}</p>
            </div>
          </article>
        ))
      }
    </main>
  )
}