import { BodegaData, ItemsWthitBodegas, ItemsData } from '../utils/FetchItemsData'
import { useFiltersBodegas, useFiltersItems } from '../hooks/useFilters'
import { useEffect, useState } from 'react'
import { AddIcon, DeleteIcon } from '../components/Icons'

export function AsignarItemBodega () {
  const [bodegas, setBodegas] = useState([])
  const [items, setItems] = useState([])
  const [carItems, setCarItems] = useState([])
  const [itemsConBodega, setItemsConBodega] = useState([])

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
  }, [])

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

  const handleAddItem = (id) => {
    setCarItems(prevItems => {
      if (!prevItems.includes(id)) {
        return [...prevItems, id]
      } else {
        return prevItems
      }
    })
  }

  const handleRemoveItem = (id) => {
    setCarItems(prevItems => {
      return prevItems.filter(item => item !== id)
    })
  }

  // eslint-disable-next-line react/prop-types
  function ItemsAgregados ({ id }) {
    const item = items?.find(item => item._id === id)
    return (
      <main key={item._id} className="grid grid-cols-3 place-items-center mb-2 p-2 rounded-md bg-orange-400 border">
        <p>{item?.nombre}</p>
        <p>{item?.placa}</p>
        <button onClick={() => handleRemoveItem(id)} className="hover:bg-red-400 rounded-full p-1 hover:text-white">
          <DeleteIcon />
        </button>
      </main>
    )
  }

  // const [message, setMessage] = useState('')
  // const [error, setError] = useState('')

  /*
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

  */

  return (
    <main className="w-ful flex flex-col">

      <article className="">
        <p className=""><span className="font-semibold pr-2">Filtrar:</span>| Placa | Serial | Nombre |</p>
        <input type="text" placeholder="Buscar Items..." value={search} onChange={ev => setSearch(ev.target.value)}
          className="bg-slate-200 w-64 p-2 rounded-md" />
        <section name="itemIds"
          className="bg-slate-300 rounded-md shadow-lg p-2 min-w-96">
          {
            filteredItems.map(item => (
              <article key={item._id} value={item._id} className='justify-normal'>
                {item.placa} | {item.nombre}
                <button
                  onClick={() => handleAddItem(item._id)}
                  className={carItems.includes(item) ? 'added' : ''}
                >
                  <AddIcon />
                </button>
              </article>
            ))
          }
        </section>

        <section>
          {
            carItems && (
              carItems?.map((item, index) => (
                <ItemsAgregados id={item} key={index} />
              ))
            )
          }
        </section>

      </article>

      <article className="flex flex-col gap-4 items-center">
        <p className=""><span className="font-semibold pr-2">Filtrar:</span>| Sucursal | Nombre | Dirección </p>
        <input type="text" placeholder="Buscar bodega..." value={searchBodega}
          onChange={ev => setSearchBodega(ev.target.value)}
          className="bg-slate-200 w-64 p-2 rounded-md" />
        <select name="sucursal"
          className="bg-slate-300 rounded-md shadow-lg p-2 min-w-96">
          <option value="">Seleccione una bodega</option>
          {
            filteredBodegas.map(bodega => (
              <option key={bodega._id} value={bodega._id} className='justify-normal'>
                {bodega.sucursal} | {bodega.nombre}
              </option>
            ))
          }
        </select>
        <button className="w-60 h-10 bg-blue-400 hover:bg-blue-600 rounded-lg text-white font-semibold">
          Asignar
        </button>
      </article>

      {/* <footer>
        {message && <p className="text-green-500 font-semibold text-center mt-4">{message}</p>}
        {error && <p className="text-red-500 font-semibold text-center mt-4">{error}</p>}
      </footer> */}
    </main>
  )
}
