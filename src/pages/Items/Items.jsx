import { BottonExportItems } from '../../components/BotonExcelDefault.jsx'
import { RenderItems } from '../../components/RenderItems.jsx'
import { useItems } from '../../hooks/useItems.js'

export function Items ({ rol, company }) {
  const { ItemsFiltrados, setSearch, search, loading } = useItems(company)

  return (
    <section className='h-[93vh] overflow-auto'>

      <section className='flex items-center justify-center gap-6 bg-blue-600  shadow-lg py-1'>
        <p><span className="font-semibold pr-2">Filtrar:</span>| Placa | Serial | Nombre |</p>
        <input type="text" value={search} onChange={ev => setSearch(ev.target.value)}
          placeholder="Teclado | 343543 | S/N:312412412" className="bg-slate-100 w-64 p-1 outline-none rounded-md" />

        <BottonExportItems datos={ItemsFiltrados} />
      </section>

      {
        loading
          ? <p className='text-center text-2xl font-semibold'>Cargando...</p>
          : <RenderItems rol={rol} filteredItems={ItemsFiltrados} />
      }

    </section>
  )
}
