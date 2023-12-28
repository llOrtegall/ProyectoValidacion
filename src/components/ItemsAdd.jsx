export function ItemsAdd({ bodegaOrigen, handleAddItem, items }) {
  return (
    bodegaOrigen?.items.map(producto => (
      <section key={producto._id} className="grid grid-cols-3 p-2 bg-blue-300 rounded-md mb-2 place-items-center">
        <p>{producto.nombre}</p>
        <p>{producto.placa}</p>
        <button
          value={producto._id}
          onClick={ev => handleAddItem(ev.target.value)}
          className={items.includes(producto._id) ? 'added' : ''}
        >
          +
        </button>
      </section>
    ))
  )
}