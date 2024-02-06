import { formatFecha } from '../../utils/funtions.js'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function DetalleBodega ({ company }) {
  const { id } = useParams()
  const [bodega, setBodega] = useState({})
  const [isExpanded, setIsExpanded] = useState(false)
  const [isExpandedSim, setIsExpandedSim] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const handleToggleSim = () => {
    setIsExpandedSim(!isExpandedSim)
  }

  useEffect(() => {
    axios.get(`/getBodegasItemsSims/${company}/${id}`)
      .then(res => {
        setBodega(res.data)
      })
      .catch(err => console.log(err))
  }, [id])

  return (
    <main className='w-full min-h-[93vh] bg-slate-200'>
      <section >
        <h1 className='text-center p-2 bg-slate-700 text-white text-lg'>Detalle Bodega Con UUID: <span className='uppercase font-semibold'>{bodega._id}</span></h1>
        <article className='bg-blue-200 grid grid-cols-2 place-items-center py-4 px-4'>
          <p className='w-[500px]'><span className='text-blue-700 font-bold'>Nombre:</span> <span className='font-semibold'>{bodega.nombre}</span></p>
          <p className='w-[500px]'><span className='text-blue-700 font-bold'>Fecha de Creación: </span><span className='font-semibold'>{formatFecha(bodega.createdAt)}</span> </p>

          <p className='w-[500px]'><span className='text-blue-700 font-bold'>Dirección:</span> <span className='font-semibold'>{bodega.direccion}</span></p>
          {
            Array.isArray(bodega.items) && bodega.items.length !== 0
              ? (<p className='w-[500px]'><span className='text-blue-700 font-bold'>N° Items Asignados:</span> <span className='font-semibold'>{bodega.items.length}</span></p>)
              : (<p className='w-[500px]'><span className='text-blue-700 font-bold'>N° Items Asignados:</span> <span className='font-semibold'>0</span></p>)
          }
          <p className='w-[500px]'><span className='text-blue-700 font-bold'>Sucursal: </span><span className='font-semibold'>{bodega.sucursal}</span></p>
          {
            Array.isArray(bodega.simcards) && bodega.simcards.length !== 0
              ? (<p className='w-[500px]'><span className='text-blue-700 font-bold'>N° Sims Asignadas:</span> <span className='font-semibold'>{bodega.simcards.length}</span></p>)
              : (<p className='w-[500px]'><span className='text-blue-700 font-bold'>N° Sims Asignadas:</span>  <span className='font-semibold'>0</span></p>)
          }
        </article>
      </section>

      {/* // TODO: Renderizado De Items Si Existen */}
      <section className='mx-2 mt-2 border border-black rounded-md flex flex-col' >
        <h3 onClick={handleToggle} className='text-center hover:underline py-2 items-center cursor-pointer'>
          <span>{isExpanded ? '▲' : '▼'}</span> Ver Detalles Items
        </h3>
        {isExpanded && (
          <>
            <article className="flex justify-around text-center bg-blue-400 shadow-lg py-2 mb-2 text-sm">
              <p className="font-semibold">Items</p>
              <p className="font-semibold">Descripción</p>
              <p className="font-semibold">Serial</p>
              <p className="font-semibold">Placa</p>
              <p className="font-semibold">Estado</p>
              <p className="font-semibold">fecha Creación</p>
            </article>
            <article>
              {
                Array.isArray(bodega.items) && bodega.items.length !== 0
                  ? (bodega.items.map(item => (
                    <article key={item._id} className='grid grid-cols-6 shadow-md rounded-md bg-slate-100 uppercase text-sm py-2 my-2 text-center'>
                      <p>{item.nombre}</p>
                      <p>{item.descripcion}</p>
                      <p>{item.serial}</p>
                      <p>{item.placa}</p>
                      <p>{item.estado}</p>
                      <p>{formatFecha(item.createdAt)} </p>
                    </article>
                    )))
                  : (<p className='text-center text-2xl font-semibold'>No Existen Items Asignados</p>)
              }
            </article>
          </>
        )}
      </section>

      {/* // TODO: Renderizado De Simcards Si Existen */}
      <section className='mx-2 mt-2 border border-black rounded-md'>
        <h3 onClick={handleToggleSim} className='text-center hover:underline py-2 items-center cursor-pointer'>
          <span>{isExpandedSim ? '▲' : '▼'}</span> Ver Detalles Simcards
        </h3>

        {
          isExpandedSim && (<>
            <article className="grid grid-cols-7 text-center bg-blue-400 shadow-lg py-2 mb-2 text-sm">
              <p className="font-semibold">Número</p>
              <p className="font-semibold">Operador</p>
              <p className="font-semibold">Estado</p>
              <p className="font-semibold">Serial</p>
              <p className="font-semibold">APN</p>
              <p className="font-semibold">User</p>
              <p className="font-semibold">Pass</p>
            </article>

            <article className=''>
              {
                Array.isArray(bodega.simcards) && bodega.simcards.length !== 0
                  ? (bodega.simcards.map(item => (
                    <article key={item._id} className="grid grid-cols-7 rounded-md bg-slate-100 uppercase text-sm py-2 my-2 text-center shadow-lg">
                      <p className="font-semibold">{item.numero}</p>
                      <p className="text-gray-500">{item.operador}</p>
                      <p className="text-gray-500">{item.estado}</p>
                      <p className="text-gray-700 overflow-ellipsis text-start overflow-hidden">{item.serial}</p>
                      <p className="text-gray-700 overflow-ellipsis text-start overflow-hidden">{item.apn}</p>
                      <p className="text-gray-500">{item.user}</p>
                      <p className="text-gray-500">{item.pass}</p>
                    </article>
                    )))
                  : (<p className='text-center text-2xl font-semibold'>No Existen Simcards Asignadas</p>)
              }
            </article>
          </>
          )
        }
      </section>
    </main>
  )
}
