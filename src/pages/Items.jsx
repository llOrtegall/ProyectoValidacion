import { ItemsData, ItemsWthitBodegas } from '../utils/FetchItemsData.js'
import { RenderBodega } from '../components/RenderBodega.jsx'
import { useFiltersItems } from '../hooks/useFilters.js'
import { useEffect, useState } from 'react'

export function Items () {
  const [items, setItems] = useState([])
  const [itembodega, setItemBodega] = useState([])
  const { search, setSearch, filteredItems } = useFiltersItems(items)

  useEffect(() => {
    ItemsData()
      .then(data => {
        setItems(data)
        localStorage.setItem('items', JSON.stringify(data))
      })

    ItemsWthitBodegas()
      .then(data => {
        setItemBodega(data)
        localStorage.setItem('itemsConBodega', JSON.stringify(data))
      })
  }, [])

  return (
    <main className="w-full px-2">

      <section className="flex items-center justify-center gap-6 bg-blue-500  rounded-md shadow-lg py-1 mb-2">
        <p><span className="font-semibold pr-2">Filtrar:</span>| Placa | Serial | Nombre |</p>
        <input type="text" value={search} onChange={ev => setSearch(ev.target.value)}
          placeholder="Teclado | 343543 | S/N:312412412" className="bg-slate-100 w-64 rounded-md p-1" />
      </section>

      <article className="flex justify-around text-center bg-blue-400 shadow-lg rounded-md py-2 mb-2">
        <p className="font-semibold">Items</p>
        <p className="font-semibold">Descripción</p>
        <p className="font-semibold">Serial</p>
        <p className="font-semibold">Placa</p>
        <p className="font-semibold">Estado</p>
        <p className="font-semibold">Ubicación</p>
      </article>

      {filteredItems.map(item => (
        <article key={item._id} className="grid grid-cols-6 shadow-md rounded-md bg-slate-200 uppercase text-sm py-2 my-2 text-center">
          <p className="font-semibold">{item.nombre}</p>
          <p className="text-gray-500">{item.descripcion}</p>
          <p className="text-gray-500">{item.serial}</p>
          <p className="text-gray-700">{item.placa}</p>
          <p className="text-gray-500">{item.estado}</p>
          <RenderBodega id={item._id} bodega={itembodega} />
        </article>
      ))}
    </main>
  )
}
