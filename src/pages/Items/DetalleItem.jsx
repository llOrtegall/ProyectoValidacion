import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Auth/AuthContext'

import { MessageDisplay } from '../../components/MessageDisplay'

const options = [
  { value: 'Impresora TMU USB/LPT', label: 'Impresora TMU | USB' },
  { value: 'Impresora Termica', label: 'Impresora Termica USB' },
  { value: 'Monitor / Pantalla', label: 'Monitor' },
  { value: 'Torre', label: 'Torre' },
  { value: 'Teclado', label: 'Teclado' },
  { value: 'Mouse / Raton', label: 'Mouse' },
  { value: 'Cámara', label: 'Cámara' },
  { value: 'Proyector', label: 'Proyector' },
  { value: 'PDA V1', label: 'PDA V1' },
  { value: 'PDA V2', label: 'PDA V2' },
  { value: 'CS10', label: 'CS10' },
  { value: 'NVR', label: 'NVR' },
  { value: 'Portátil', label: 'Portátil' },
  { value: 'Lector De Barras', label: 'Lector De Barras' },
  { value: 'Lector De Biometríco', label: 'Lector De Biometríco' },
  { value: 'Modem', label: 'Modem' },
  { value: 'UPS', label: 'UPS' },
  { value: 'Switch', label: 'Switch' },
  { value: 'Router', label: 'Router' },
  { value: 'Batería', label: 'Batería' },
  { value: 'Inversor', label: 'Inversor' },
  { value: 'Televisor', label: 'Televisor' },
  { value: 'Proyector', label: 'Proyector' },
  { value: 'Telefono Fijo', label: 'Telefono Fijo' },
  { value: 'Telefono Celular', label: 'Telefono Celular' },
  { value: 'Silla', label: 'Silla' }
]

export function DetalleItem() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { id } = useLocation().state
  const navigate = useNavigate()
  const { company } = useAuth()
  const [item, setItem] = useState({
    nombre: '',
    descripcion: '',
    placa: '',
    serial: '',
    estado: ''
  })

  useEffect(() => {
    axios.get(`/getItem/${company}/${id}`)
      .then(res => {
        setItem(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [company, id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setItem(prevItem => ({ ...prevItem, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const addCompany = { ...item, company }
    axios.patch('/updateItem/', addCompany)
      .then(res => {
        setMessage(res.data.message)
        setItem({
          nombre: '',
          descripcion: '',
          placa: '',
          serial: '',
          estado: ''
        })
        setTimeout(() => {
          navigate('/bodega/stock/items')
        }, 2000)
      })
      .catch(err => {
        console.log(err)
        setError(err.response.data.error)
      })
      .finally(
        setTimeout(() => {
          setMessage('')
          setError('')
        }, 4000)
      )
  }

  return (
    <section>
      <h1>Detalle de Item</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <select name="nombre" value={item.nombre} onChange={handleChange}>
          <option value="">Seleccionar Un Item</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label>Descripcion:</label>
        <input type="text" name="descripcion" value={item.descripcion} onChange={handleChange} />
        <label>Placa:</label>
        <input type="text" name="placa" value={item.placa} onChange={handleChange} />
        <label>Serial:</label>
        <input type="text" name="serial" value={item.serial} onChange={handleChange} />
        <label>Estado:</label>
        <select name="estado" value={item.estado} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-md">
          <option value="">Selecciona un estado</option>
          <option value="Nuevo">Nuevo</option>
          <option value="Bueno">Bueno</option>
          <option value="Malo">Malo</option>
          <option value="Baja">Baja</option>
        </select>
        <button type="submit">Actualizar</button>
      </form>

      <MessageDisplay message={message} error={error} />
    </section>
  )
}
