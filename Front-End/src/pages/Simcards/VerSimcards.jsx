import { useEffect, useState } from 'react'
import { simcardsBodegas } from '../../utils/FetchItemsData.js'

export function VerSimcards () {
  const [simcardsConBodega, setSimcardsConBodega] = useState([])

  useEffect(() => {
    simcardsBodegas()
      .then(data => {
        setSimcardsConBodega(data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <main className='px-2 mt-2'>
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
        simcardsConBodega?.length > 0
          ? simcardsConBodega?.map(item => (
            <article key={item._id} className="grid grid-cols-8 rounded-md bg-slate-200 uppercase text-sm py-2 my-2 text-center shadow-lg">
              <p className="font-semibold">{item.numero}</p>
              <p className="text-gray-500">{item.operador}</p>
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
