import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function DetalleBodega () {
  const { id } = useParams()
  const [movimiento, setMovimiento] = useState(null)

  console.log(movimiento)

  useEffect(() => {
    axios.get(`/getBodegasItemsSims/${id}`)
      .then(res => {
        setMovimiento(res.data)
      })
      .catch(err => console.log(err))
  }, [id])

  return (
    <h2>
      Detalle Bodega
    </h2>
  )
}
