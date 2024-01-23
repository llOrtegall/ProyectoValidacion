const RenderItems = ({ items }) => {
  return (
    <ul className="items">
      {
        items.map((item) => {
          return (
            <li key={item.id} className="item">
              <div>
                <p>Nombre: </p>
                <p>Descripción: </p>
                <p>Placa: </p>
                <p>Serial: </p>
                <p>Estado: </p>
                <p>Bodega: </p>
              </div>
              <div>
                <p>{item.Nombre}</p>
                <p>{item.Descripcion}</p>
                <p>{item.Placa}</p>
                <p>{item.Serial}</p>
                <p>{item.Estado}</p>
                <p>{item.Bodega}</p>
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}

const RendernoItems = () => {
  return (
    <p>No hay resultados</p>
  )
}

export function Items ({ items }) {
  const hasItems = items.length > 0
  return (
    hasItems
      ? <RenderItems items={items} />
      : <RendernoItems />
  )
}
