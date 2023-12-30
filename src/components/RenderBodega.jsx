// eslint-disable-next-line react/prop-types
export function RenderBodega({ id, bodega}) {
  // eslint-disable-next-line react/prop-types
  const nameBodega = bodega.filter(bodega => bodega.itemId === id)

  return (
    nameBodega.map(bodega => (
      <p className="text-gray-500" key={bodega.itemId}>{bodega.nombreBodega}</p>
    ))
  )
}