import { BottonExportItems } from '../../components/BotonExcelDefault.jsx'
import { RenderItems } from '../../components/RenderItems.jsx'
import { DetalleItem } from '../../components/DetalleItem.jsx'
import { useFiltersItems } from '../../hooks/useFilters.js'
import { useItems } from '../../hooks/useItems.js'
import { useEffect, useState } from 'react'

export function Items ({ rol, company }) {
  const { items, getItems } = useItems({ empresa: company })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    getItems()
  }, [isModalOpen])

  const { search, setSearch, filteredItems } = useFiltersItems(items)

  const handleClick = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  console.log(rol)

  return (
    <section className='h-[93vh] overflow-auto'>

      <section className='flex items-center justify-center gap-6 bg-blue-500  shadow-lg py-2'>
        <p><span className="font-semibold pr-2">Filtrar:</span>| Placa | Serial | Nombre |</p>
        <input type="text" value={search} onChange={ev => setSearch(ev.target.value)}
          placeholder="Teclado | 343543 | S/N:312412412" className="bg-slate-100 w-64 p-1 outline-none rounded-md" />

        <BottonExportItems datos={filteredItems} />
      </section>

      {filteredItems && <RenderItems rol={rol} handleClick={handleClick} filteredItems={filteredItems} />}

      {rol === 'Analista Desarrollo' ||
        rol === 'Jefe Tecnología' ||
        rol === 'Director Tecnología' ||
        rol === 'Coordinador Soporte'
        ? (isModalOpen === true
            ? <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <section className="relative bg-white p-5 rounded-md">
              <DetalleItem item={selectedItem} company={company} onClose={() => setIsModalOpen(false)} />
            </section>
          </div>
            : <></>)
        : <></>}
    </section>
  )
}
