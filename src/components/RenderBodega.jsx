import { useEffect, useState } from "react"
import axios from "axios"

// eslint-disable-next-line react/prop-types
export function RenderBodega({ id }) {
  const [bodega, setBodega] = useState([])

  useEffect(() => {
    if (localStorage.getItem('bodega')) {
      console.log('bodega from local storage');
      setBodega(JSON.parse(localStorage.getItem('bodega')))
    } else {
      console.log('bodega from local bd');
      axios.get('/findBodegaWithItems')
        .then(res => {
          setBodega(res.data)
          localStorage.setItem('bodega', JSON.stringify(res.data))
        })
        .catch(err => console.log(err))
    }
  }, [])

  const bodegaItem = bodega.filter(bodega => bodega.itemId === id)

  return (
    bodegaItem.map(bodega => (
      <p className="text-gray-500" key={bodega.itemId}>{bodega.nombreBodega}</p>
    ))
  )
}