import { BottonExportSimcards } from '../../components/BotonExcelDefault.jsx'
import { simcardsBodegas } from '../../services/FetchItemsData.js'
import { useFilterSimcards } from '../../hooks/useFilters.js'
import { RenderIconSims } from '../../components/RenderIconSims.jsx'
import { useIdleTimer } from '../../hooks/useIdleTimer.js'
import { useEffect, useState } from 'react'

export function VerSimcards ({ fun, company }) {
  const [simcardsConBodega, setSimcardsConBodega] = useState([])
  const logout = fun
  useIdleTimer(logout, 600000)
  useEffect(() => {
    simcardsBodegas(company)
      .then(data => {
        setSimcardsConBodega(data)
      })
      .catch(err => console.log(err))
  }, [])

  const { filteredSimcards, searchSimcard, setSearchSimcard } = useFilterSimcards(simcardsConBodega)

  return (
    <main className="h-[93vh] overflow-auto">

      <section className='flex w-full justify-center items-center gap-4 py-1 bg-blue-500 px-4'>
        <p className=""><span className="font-semibold pr-2">Filtrar:</span>| Operador | Serial | Número</p>
        <input type="text" placeholder="Buscar simcards..."
          value={searchSimcard} onChange={ev => setSearchSimcard(ev.target.value)}
          className="bg-slate-200 w-64 p-1.5 rounded-md" />
        <BottonExportSimcards simcards={filteredSimcards} />
      </section>

      <article className="grid grid-cols-8 text-center bg-blue-400 shadow-lg rounded-md py-2 mb-2">
        <p className="font-semibold">Número</p>
        <p className="font-semibold">Operador</p>
        <p className="font-semibold">Estado</p>
        <p className="font-semibold">Serial</p>
        <p className="font-semibold">APN</p>
        <p className="font-semibold">User</p>
        <p className="font-semibold">Pass</p>
        <p className="font-semibold">Ubicación</p>

      </article>
      {
        filteredSimcards?.length > 0
          ? filteredSimcards?.map(item => (
            <article key={item._id} className="grid grid-cols-8 place-items-center rounded-md bg-slate-200 uppercase text-sm py-2 my-2 text-center shadow-lg">
              <p className="font-semibold">{item.numero}</p>
              <p className="text-gray-500 flex w-full items-center justify-center gap-2">
                <span className='w-20'>{item.operador}</span> <RenderIconSims operador={item.operador} />
              </p>
              <p className="text-gray-500">{item.estado}</p>
              <p className="text-gray-700 overflow-ellipsis text-start overflow-hidden">{item.serial}</p>
              <p className="text-gray-700 overflow-ellipsis text-start overflow-hidden">{item.apn}</p>
              <p className="text-gray-500">{item.user}</p>
              <p className="text-gray-500">{item.pass}</p>
              <p className='text-gray-700 font-semibold text-xs'>{item.bodega.nombre || item.bodega}</p>
            </article>
          ))
          : <p className='text-center text-2xl font-semibold'>No Existen Items</p>
      }
    </main>
  )
}
