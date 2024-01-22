import { useState } from 'react'

export function DetalleItem ({ item, onClose }) {
  console.log(item)
  const BodegaNombre = item.bodega.nombre || 'No Asignado'

  const [formData, setFormData] = useState({
    id: item._id,
    serial: item.serial,
    placa: item.placa,
    estado: item.estado,
    descripcion: item.descripcion
  })

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Aquí puedes hacer lo que necesites con los datos del formulario
    // Por ejemplo, podrías enviarlos a una API
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='bg-blue-200 p-4'>
      <input className='uppercase' type="text" name="serial" value={formData.serial} onChange={handleInputChange} />
      <input className='uppercase' type="text" name="estado" value={formData.estado} onChange={handleInputChange} />
      <input className='uppercase' type="text" name="placa" value={formData.placa} onChange={handleInputChange} />
      <input className='uppercase' type="text" name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
      <label>{BodegaNombre}</label>

      <button type="submit">Actualizar</button>
      <button onClick={onClose}>Close</button>
    </form>
  )
}
