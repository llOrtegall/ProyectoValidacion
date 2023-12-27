import { ItemsInBodega } from "../components/itemsInBodega"
import { useEffect, useState } from "react"
import axios from "axios"

export function Bodegas() {
  const [bodegas, setBodegas] = useState([])
  const [search, setSearch] = useState('')
  const [activeBodegaId, setActiveBodegaId] = useState(null);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const handleActive = (id) => {
    setActiveBodegaId(id)
  }

  const filteredItems = bodegas.filter(item =>
    item.nombre.toLowerCase().includes(search.toLowerCase()) ||
    item.sucursal.toLowerCase().includes(search.toLowerCase())
  )

  const restartActive = () => {
    setActiveBodegaId(null)
  }

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
          <section key={bodega._id} className="grid grid-cols-10 border border-gray-400 rounded place-items-center">
            <article className="col-span-2">
              <h2 className="font-semibold">{bodega.nombre}</h2>
              <p><span className="font-semibold">Sucursal: </span> {bodega.sucursal}</p>
              <p><span className="font-semibold">Dirección: </span>{bodega.direccion}</p>
            </article>

            <article className="col-span-1">
              <p>Items Asignados: <span className="font-semibold">{bodega.items.length}</span></p>
            </article>

            <button className="col-span-2 p-2 h-10  text-white font-semibold rounded-md bg-blue-400 hover:bg-blue-600" onClick={() => handleActive(bodega._id)}>
              Ver Items Asignados
            </button>
            <article className="col-span-4">
              {
                activeBodegaId === bodega._id ?
                  <ItemsInBodega bodega={bodega} key={bodega._id} fun={restartActive} />
                  : null
              }
            </article>

          </section>
        ))
      }
    </main>
  )
}