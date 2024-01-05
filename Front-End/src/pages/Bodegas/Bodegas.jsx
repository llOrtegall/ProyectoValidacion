import { ItemsInBodega } from '../../components/itemsInBodega.jsx'
import { useFiltersBodegas } from '../../hooks/useFilters.js'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function Bodegas () {
  const [bodegas, setBodegas] = useState([])
  const [activeBodegaId, setActiveBodegaId] = useState(null)

  const { setSearchBodega, filteredBodegas, searchBodega } = useFiltersBodegas(bodegas)

  const handleActive = (id) => {
    setActiveBodegaId(id)
  }

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
        <input type="text" value={searchBodega} onChange={ev => setSearchBodega(ev.target.value)}
          placeholder="Buscar Bodega..." className="bg-slate-100 w-64 p-2 rounded-md" />
      </section>

      {
        filteredBodegas.map(bodega => (
          <section key={bodega._id} className="flex h-auto bg-slate-300 m-2 rounded-md p-2 items-center justify-around">

            <article className="w-72">
              <h2 className="font-semibold">{bodega.nombre}</h2>
              <p><span className="font-semibold">Sucursal: </span> {bodega.sucursal}</p>
              <p><span className="font-semibold">Dirección: </span>{bodega.direccion}</p>
            </article>

            <article className="">
              <p>Items Asignados: <span className="font-semibold">{bodega.items.length}</span></p>
            </article>

            <button className="p-2 text-white font-semibold rounded-md bg-blue-400 hover:bg-blue-600" onClick={() => handleActive(bodega._id)}>
              Ver Items Asignados
            </button>

            <article className="">
              {
                activeBodegaId === bodega._id
                  ? <ItemsInBodega bodega={bodega} key={bodega._id} fun={restartActive} />
                  : null
              }
            </article>

          </section>
        ))
      }
    </main>
  )
}
