import { CloseIcon } from '../components/Icons.jsx'
import { MessageDisplay } from '../components/MessageDisplay.jsx'
import { useState } from 'react'
import axios from 'axios'

export function DetalleItem ({ item, onClose, company }) {
  const BodegaNombre = item.bodega !== undefined ? item.bodega.Nombre : 'No Asignado'
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const [formData, setFormData] = useState({
    id: item.Id,
    serial: item.Serial,
    placa: item.Placa,
    estado: item.Estado,
    descripcion: item.Descripcion,
    company: company
  })

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.patch('/updateItem', formData)
      .then(res => {
        setMessage(res.data.message)
        setTimeout(() => {
          setMessage('')
          onClose()
        }, 2500)
      })
      .catch(err => {
        setError(err.response.data.error)
        setTimeout(() => {
          setError('')
        }, 4000)
      })
  }

  return (
    <form onSubmit={handleSubmit} className='bg-blue-200 p-6 relative flex flex-col items-center gap-4'>
      <h2 className='font-semibold'>Item Seleccionado UUID: <span className='uppercase font-normal'>{item.Id}</span></h2>
      <button className='absolute top-0 right-0 hover:bg-red-500 rounded-full hover:text-white' onClick={onClose}><CloseIcon /></button>
      <article className='grid grid-cols-2 gap-4'>
        <div className='flex justify-between items-center w-72'>
          <label className='w-1/3'>Serial:</label>
          <input className='uppercase w-2/3 p-1.5 rounded-md' type="text" name="serial" value={formData.serial} onChange={handleInputChange} />
        </div>
        <div className='flex justify-between items-center w-72'>
          <label className='w-1/3'>Estado:</label>
          <input className='uppercase w-2/3 p-1.5 rounded-md' type="text" name="estado" readOnly value={formData.estado} onChange={handleInputChange} />
        </div>
        <div className='flex justify-between items-center w-72'>
          <label className='w-1/3'>Placa:</label>
          <input className='uppercase w-2/3 p-1.5 rounded-md' type="text" name="placa" value={formData.placa} onChange={handleInputChange} />
        </div>
        <div className='flex justify-between items-center w-72'>
          <label className='w-1/3'>Descripción:</label>
          <input className='uppercase w-2/3 p-1.5 rounded-md' type="text" name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
        </div>
      </article>

      <label><span className='font-semibold'>Bodega:</span> {BodegaNombre}</label>

      <div className='flex gap-3 justify-between'>
        <button type="submit" className='bg-green-500 text-white p-2 rounded-md font-semibold'>Actualizar</button>
      </div>

      <MessageDisplay message={message} error={error} />
    </form>
  )
}
