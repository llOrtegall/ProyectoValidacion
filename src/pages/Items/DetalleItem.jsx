import { useAuth } from '../../Auth/AuthContext.jsx'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { SelectComponent } from '../../components/SelectComponent.jsx'

export function DetalleItem() {
  const { state } = useLocation()
  const { company } = useAuth()
  const { id } = state

  useEffect(() => {
    axios.get(`/getItem/${company}/${id}`)
      .then(res => {
        setData(res.data)
      })
  }, [state, company, id])

  const [data, setData] = useState({})

  return (

    <form className='bg-blue-200 p-6 flex flex-col items-center gap-4'>

      <h2 className='font-semibold'>Item Seleccionado UUID: <span className='uppercase font-normal'>{id}</span></h2>

      <article className='grid grid-cols-2 gap-4'>

        <label className='w-1/3'>Nombre:</label>
        <SelectComponent value={data.nombre} />

        <div className='flex justify-between items-center w-72'>
          <label className='w-1/3'>Serial:</label>
          <input className='uppercase w-2/3 p-1.5 rounded-md' type="text" name="serial" value={data.serial} />
        </div>
        <div className='flex justify-between items-center w-72'>
          <label className='w-1/3'>Estado:</label>
          <input className='uppercase w-2/3 p-1.5 rounded-md' type="text" name="estado" value={data.estado} readOnly />
        </div>
        <div className='flex justify-between items-center w-72'>
          <label className='w-1/3'>Placa:</label>
          <input className='uppercase w-2/3 p-1.5 rounded-md' type="text" name="placa" value={data.placa} />
        </div>
        <div className='flex justify-between items-center w-72'>
          <label className='w-1/3'>Descripción:</label>
          <input className='uppercase w-2/3 p-1.5 rounded-md' type="text" name="descripcion" value={data.descripcion} />
        </div>
      </article>

      <div className='flex gap-3 justify-between'>
        <button type="submit" className='bg-green-500 text-white p-2 rounded-md font-semibold'>Actualizar</button>
      </div>
    </form>

  )
}
