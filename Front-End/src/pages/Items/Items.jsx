import { BottonExportItems } from '../../components/BotonExcelDefault.jsx'
import { fechtItemsBodegas } from '../../utils/FetchItemsData.js'
import { useFiltersItems } from '../../hooks/useFilters.js'
import { useEffect, useState } from 'react'

export function Items () {
  useEffect(() => {
    fechtItemsBodegas()
      .then(data => setItemBodega(data))
      .catch(err => console.log(err))
  }, [])

  const [ItemsWthitBodegas, setItemBodega] = useState([])

  const { search, setSearch, filteredItems } = useFiltersItems(ItemsWthitBodegas)

  return (
    <main className="w-full">

      <section className="flex items-center justify-center gap-6 bg-blue-500  shadow-lg py-2">
        <p><span className="font-semibold pr-2">Filtrar:</span>| Placa | Serial | Nombre |</p>
        <input type="text"
          value={search} onChange={ev => setSearch(ev.target.value)}
          placeholder="Teclado | 343543 | S/N:312412412" className="bg-slate-100 w-64 p-1 outline-none" />
        <BottonExportItems datos={filteredItems} />
      </section>

      <article className="flex justify-around text-center bg-blue-400 shadow-lg py-2">
        <p className="font-semibold">Items</p>
        <p className="font-semibold">Descripción</p>
        <p className="font-semibold">Serial</p>
        <p className="font-semibold">Placa</p>
        <p className="font-semibold">Estado</p>
        <p className="font-semibold">Ubicación</p>
      </article>
      {
        ItemsWthitBodegas?.length > 0
          ? filteredItems?.map(item => (
            <article key={item._id} className="grid grid-cols-6 shadow-md bg-slate-200 uppercase text-sm py-2 my-2 text-center">
              <p className="font-semibold">{item.nombre}</p>
              <p className="text-gray-500">{item.descripcion}</p>
              <p className="text-gray-500">{item.serial}</p>
              <p className="text-gray-700">{item.placa}</p>
              <p className="text-gray-500">{item.estado}</p>
              <p className='text-gray-500'>{item.bodega.nombre || item.bodega}</p>
            </article>
          ))
          : <p className='text-center text-2xl font-semibold'>No Existen Items</p>
      }
      <section className='flex flex-col'>
      </section>
    </main>
  )
}
