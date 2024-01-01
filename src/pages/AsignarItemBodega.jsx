import axios from 'axios'
import { useEffect, useState } from 'react'
import { AddIcon } from '../components/Icons'
import { BodegaData, ItemsData } from '../utils/FetchItemsData'
import { Items } from './Items'

export function AsignarItemBodega () {
  const [searchBodega, setSearchBodega] = useState('')
  const [bodegas, setBodegas] = useState([])
  const [message, setMessage] = useState('')
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const [items, setItems] = useState([])

  const [itemsIds, setItemsIds] = useState([])

  useEffect(() => {
    // Traer bodegas de la base de datos
    BodegaData().then(data => setBodegas(data))
    ItemsData().then(data => {
      setItems(data.bodega)
    })
  }, [])

  console.log(Items)

  const handleAddItem = (id) => {
    setItemsIds(prevItems => {
      if (!prevItems.includes(id)) {
        return [...prevItems, id]
      } else {
        return prevItems
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/addItemToBodega', item)
      .then(res => {
        console.log(res)
        setItem({
          itemIds: [],
          sucursal: ''
        })
        setMessage(res.data.message)
        setTimeout(() => {
          setMessage('')
        }, 5000)
      })
      .catch(err => {
        setError(err.response.data.error)
        setTimeout(() => {
          setError('')
        }, 5000)
      })
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSearchBodegaChange = (event) => {
    setSearchBodega(event.target.value)
  }

  const filteredItems = items.filter(item =>
    item.nombre.toLowerCase().includes(search.toLowerCase()) ||
    item.placa.toLowerCase().includes(search.toLowerCase()) ||
    item.serial.toLowerCase().includes(search.toLowerCase())
  )

  const filteredBodegas = bodegas.filter(bodega =>
    bodega.nombre.toLowerCase().includes(searchBodega.toLowerCase()) ||
    bodega.sucursal.toLowerCase().includes(searchBodega.toLowerCase()) ||
    bodega.direccion.toLowerCase().includes(searchBodega.toLowerCase())
  )

  return (
    <main className="w-ful flex flex-col">

      <form className="flex justify-around" onSubmit={handleSubmit}>

        <article className="">
          <p className=""><span className="font-semibold pr-2">Filtrar:</span>| Placa | Serial | Nombre |</p>
          <input type="text" value={search} onChange={handleSearchChange} placeholder="Buscar Items..." className="bg-slate-200 w-64 p-2 rounded-md" />
          <section name="itemIds"
            className="bg-slate-300 rounded-md shadow-lg p-2 min-w-96">

            {
              filteredItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between">
                  <p>{item.nombre} - {item.placa}</p>
                  <button
                    onClick={() => handleAddItem(item._id)}
                    className={items.includes(item._id) ? 'added' : ''}
                  >
                    <AddIcon />
                  </button>
                </div>
              ))
            }

          </section>
        </article>

        <article className="flex flex-col gap-4 items-center">
          <p className=""><span className="font-semibold pr-2">Filtrar:</span>| Sucursal | Nombre | Dirección </p>
          <input type="text" value={searchBodega} onChange={handleSearchBodegaChange} placeholder="Buscar bodega..." className="bg-slate-200 w-64 p-2 rounded-md" />
          <select name="sucursal"
            className="bg-slate-300 rounded-md shadow-lg p-2 min-w-96">
            <option value="">Seleccione una bodega</option>
            {
              filteredBodegas.map((bodega) => {
                return (
                  <option key={bodega._id} value={bodega.sucursal} >
                    {bodega.nombre} - {bodega.sucursal} - {bodega.direccion}
                  </option>
                )
              })
            }
          </select>
          <button className="w-60 h-10 bg-blue-400 hover:bg-blue-600 rounded-lg text-white font-semibold">
            Asignar
          </button>
        </article>

      </form>

      <footer>
        {message && <p className="text-green-500 font-semibold text-center mt-4">{message}</p>}
        {error && <p className="text-red-500 font-semibold text-center mt-4">{error}</p>}
      </footer>
    </main>
  )
}
