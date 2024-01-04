export function RenderBodega ({ item, bodegas }) {

  console.log(item)
  console.log(bodegas)

  const nameBodega = bodegas.filter(b => b._id === item._id)

  console.log(nameBodega)

  return (
    nameBodega.map(b => (
      <p className="text-gray-500" key={b.itemId}>{b.nombreBodega}</p>
    ))
  )
}
