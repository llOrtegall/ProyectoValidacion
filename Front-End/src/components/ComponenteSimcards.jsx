import { SimcardAgregada } from '../components/SimcardAgregada.jsx'

// eslint-disable-next-line react/prop-types
export function ComponenteSimcards ({ bodegaOrigen, bodegaDestino, handleRemoveItem, handleRemoveItem2, cartSims, cartSims2 }) {
  return (
    <section className='grid grid-cols-2'>
      <main className='col-span-1'>
        <h2 className="text-center py-1 font-semibold bg-green-200 text-black rounded-t-lg">Simcards Que Ingresarán :</h2>
        <section style={{ maxHeight: '450px', overflowY: 'auto' }}>
          <p className='grid grid-cols-3 place-items-center bg-green-200 text-black font-semibold'><span>Número</span> <span>Serial</span> <span> - </span></p>
          {
            cartSims && (
              cartSims?.map(sim => (
                // <SimcardAgregadas id={sim} key={sim} simcards={bodegaOrigen.simcards} handleRemoveItem={handleRemoveItem} />
                <SimcardAgregada id={sim} key={sim} simcards={bodegaOrigen.simcards} handleRemoveItem={handleRemoveItem} color='green' />
              ))
            )
          }
        </section>
      </main>
      <main className='col-span-1'>
        <h2 className="text-center py-1 font-semibold bg-red-200 text-black rounded-t-lg">Simcards Retiradas :</h2>
        <section style={{ maxHeight: '450px', overflowY: 'auto' }}>
          <p className='grid grid-cols-3 place-items-center bg-red-200 text-black font-semibold'><span>Número</span> <span>Serial</span> <span> - </span></p>
          {
            cartSims2 && (
              cartSims2?.map(sim => (
                // <SimcardRetiradas id={sim} key={sim} simcards={bodegaDestino.simcards} handleRemoveItem={handleRemoveItem2} />
                <SimcardAgregada id={sim} key={sim} simcards={bodegaDestino.simcards} handleRemoveItem={handleRemoveItem2} color='red' />
              ))
            )
          }
        </section>
      </main>
    </section>
  )
}
