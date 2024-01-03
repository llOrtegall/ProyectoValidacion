export function RenderBodega ({ id, bodega }) {
  const nameBodega = bodega.filter(b => b.itemId === id)

  return (
    nameBodega.map(b => (
      <p className="text-gray-500" key={b.itemId}>{b.nombreBodega}</p>
    ))
  )
}
