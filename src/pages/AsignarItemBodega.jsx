import { BodegaData, ItemsWthitBodegas, ItemsData } from '../utils/FetchItemsData'
import { useFiltersBodegas, useFiltersItems } from '../hooks/useFilters'
import { ItemsAgregados } from '../components/ItemsAgregados'
import { useCarItems } from '../hooks/useCartItems'
import { AddIcon } from '../components/Icons'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function AsignarItemBodega () {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [bodegas, setBodegas] = useState([])
  const [items, setItems] = useState([])
  const [itemsConBodega, setItemsConBodega] = useState([])

  const [sendBodega, setSendBodega] = useState('')

  useEffect(() => {
    if (localStorage.getItem('itemsConBodega')) {
      setItemsConBodega(JSON.parse(localStorage.getItem('itemsConBodega')))
    } else {
      ItemsWthitBodegas()
        .then(data => {
          setItemsConBodega(data)
          localStorage.setItem('itemsConBodega', JSON.stringify(data))
        })
    }

    if (localStorage.getItem('items')) {
      setItems(JSON.parse(localStorage.getItem('items')))
    } else {
      ItemsData()
        .then(data => {
          setItems(data)
          localStorage.setItem('items', JSON.stringify(data))
        })
    }

    BodegaData()
      .then(data => {
        setBodegas(data)
        localStorage.setItem('bodegas', JSON.stringify(data))
      })
  }, [message])

  const ItemsSinBodega = ({ arrayItems }) => {
    const itemsSinBodega = itemsConBodega.filter(item => item.nombreBodega === 'N/A')
    const itemsResultantes = arrayItems.filter(item =>
      itemsSinBodega.some(bodegaItem => bodegaItem.itemId === item._id)
    )
    return itemsResultantes
  }

  const ItemsRender = ItemsSinBodega({ arrayItems: items })

  const { searchBodega, setSearchBodega, filteredBodegas } = useFiltersBodegas(bodegas)
  const { search, setSearch, filteredItems } = useFiltersItems(ItemsRender)
  const { carItems, handleAddItem, handleRemoveItem, setCarItems } = useCarItems()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/addItemsToBodega',
        { sucursal: sendBodega, itemIds: carItems }
      )
      setMessage(res.data.message)
      setItemsConBodega([])
      setBodegas([])
      setItems([])
      setCarItems([])
      localStorage.removeItem('itemsConBodega')
      localStorage.removeItem('bodegas')
      localStorage.removeItem('items')
      setTimeout(() => {
        setMessage('')
      }, 4000)
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.error || 'An error occurred')
      setTimeout(() => {
        setError('')
      }, 4000)
    }
  }

  return (
    <main className="w-full flex justify-around">

      <article className="flex flex-col gap-4 items-center">
        <section className='flex items-center pt-10 gap-5'>
          <p className=""><span className="font-semibold pr-2">Filtrar:</span>| Placa | Serial | Nombre |</p>
          <input type="text" placeholder="Buscar Items..." value={search} onChange={ev => setSearch(ev.target.value)}
            className="bg-slate-200 w-64 p-2 rounded-md" />
        </section>

        <section name="itemIds"
          className="bg-slate-300 rounded-md shadow-lg p-2 min-w-96">
          {
            filteredItems.map(item => (
              <article key={item._id} value={item._id} className='flex justify-between'>
                {item.placa} | {item.nombre}
                <button
                  onClick={() => handleAddItem(item._id)}
                  className={carItems.includes(item._id) ? 'added' : ''}
                >
                  <AddIcon />
                </button>
              </article>
            ))
          }
        </section>

        <section className='w-full flex flex-col'>
          <h2 className='text-xl font-semibold text-center pb-4'>Items Seleccionados Para Asignación: </h2>
          {
            carItems && (
              carItems?.map(item => (
                <ItemsAgregados id={item} key={item} items={items} handleRemoveItem={handleRemoveItem} />
              ))
            )
          }
        </section>
      </article>

      <article className="flex flex-col gap-4 items-center">
        <section className='flex items-center pt-10 gap-5'>
          <p className=""><span className="font-semibold pr-2">Filtrar:</span>| Sucursal | Nombre | Dirección </p>
          <input type="text" placeholder="Buscar bodega..." value={searchBodega}
            onChange={ev => setSearchBodega(ev.target.value)}
            className="bg-slate-200 w-64 p-2 rounded-md" />
        </section>
        <select name="sucursal" id="sucursal" value={sendBodega} onChange={ev => setSendBodega(ev.target.value)}
          className="bg-slate-300 rounded-md shadow-lg p-2 min-w-96">
          <option value="">Seleccione una bodega</option>
          {
            filteredBodegas.map(bodega => (
              <option key={bodega._id} value={bodega.sucursal} className='justify-normal'>
                {bodega.sucursal} | {bodega.nombre}
              </option>
            ))
          }
        </select>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
          <button className="w-60 h-10 bg-blue-400 hover:bg-blue-600 rounded-lg text-white font-semibold">
            Asignar
          </button>
        </form>

        <footer>
          {message && <p className="text-green-500 font-semibold text-center mt-4">{message}</p>}
          {error && <p className="text-red-500 font-semibold text-center mt-4">{error}</p>}
        </footer>
      </article>
    </main>
  )
}
