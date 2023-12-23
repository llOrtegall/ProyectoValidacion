import axios from "axios"
import { useEffect, useState } from "react"

// eslint-disable-next-line react/prop-types
export function RenderBodega({ id }) {
  const [bodega, setBodega] = useState('')
  console.log(id)
  console.log(bodega)  

  useEffect(() => {
    axios.post('/findBodegaWithItems', { itemId: id })
      .then(res => {
        setBodega(res.data.nombreBodega)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    bodega
      ? <p className="text-gray-500 ">{bodega}</p>
      : <p className="text-gray-500 ">No hay bodega</p>
  )
}