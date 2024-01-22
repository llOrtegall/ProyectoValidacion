import { BottonExportItems } from '../../components/BotonExcelDefault.jsx'
import { LockIcon } from '../../components/Icons.jsx'
import { fechtItemsBodegas } from '../../utils/FetchItemsData.js'
import { DetalleItem } from '../../components/DetalleItem.jsx'
import { useFiltersItems } from '../../hooks/useFilters.js'
import { useIdleTimer } from '../../hooks/useIdleTimer.js'
import { useEffect, useState } from 'react'

export function Items ({ fun, user }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const logout = fun

  useIdleTimer(logout, 600000)

  useEffect(() => {
    fechtItemsBodegas()
      .then(data => setItemBodega(data))
      .catch(err => console.log(err))
  }, [isModalOpen])

  const handleClick = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const [ItemsWthitBodegas, setItemBodega] = useState([])
  const { search, setSearch, filteredItems } = useFiltersItems(ItemsWthitBodegas)

  return (
    <main className='relative'>

      <section className='flex items-center justify-center gap-6 bg-blue-500  shadow-lg py-2'>
        <p><span className="font-semibold pr-2">Filtrar:</span>| Placa | Serial | Nombre |</p>
        <input type="text"
          value={search} onChange={ev => setSearch(ev.target.value)}
          placeholder="Teclado | 343543 | S/N:312412412" className="bg-slate-100 w-64 p-1 outline-none" />
        <BottonExportItems datos={filteredItems} />
      </section>

      <article className='flex justify-around text-center bg-blue-400 shadow-lg py-2'>
        <p className="font-semibold">Items</p>
        <p className="font-semibold">Descripción</p>
        <p className="font-semibold">Serial</p>
        <p className="font-semibold">Placa</p>
        <p className="font-semibold">Estado</p>
        <p className="font-semibold">Ubicación</p>
        <p className="font-semibold">Acciones</p>
      </article>
      {
        ItemsWthitBodegas?.length > 0
          ? filteredItems?.map(item => (
            <article key={item._id}
              className='grid grid-cols-7 shadow-md bg-slate-200 uppercase text-sm py-2 my-2 text-center  place-items-center'>
              <p className="font-semibold">{item.nombre}</p>
              <p className="text-gray-500">{item.descripcion}</p>
              <p className="text-gray-500">{item.serial}</p>
              <p className="text-gray-700">{item.placa}</p>
              <p className="text-gray-500">{item.estado}</p>
              <p className='text-gray-500'>{item.bodega.nombre || item.bodega}</p>
              {
                user.rol === 'Analista Desarrollo' || user.rol === 'Jefe Tecnología' || user.rol === 'Director Tecnología' || user.rol === 'Coordinador Soporte'
                  ? <button onClick={() => handleClick(item)} className='bg-green-500 w-28 p-1 rounded-md font-semibold hover:bg-green-400 hover:text-white'>Editar Item</button>
                  : <div className='flex items-center gap-2'>
                      <button className="bg-green-300 text-white font-bold py-2 px-4 rounded" disabled>Editar Item</button>
                      <div className='text-red-500'><LockIcon /></div>
                    </div>
              }
            </article>
          ))
          : <p className='text-center text-2xl font-semibold'>No Existen Items</p>
      }
      <section className='flex flex-col'>
      </section>
      {
        user.rol === 'Analista Desarrollo' || user.rol === 'Jefe Tecnología' || user.rol === 'Director Tecnología' || user.rol === 'Coordinador Soporte'
          ? (isModalOpen === true
              ? <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <section className="relative bg-white p-5 rounded-md">
                <DetalleItem item={selectedItem} onClose={() => setIsModalOpen(false)} />
              </section>
            </div>
              : <></>)
          : <></>
      }

    </main>
  )
}
