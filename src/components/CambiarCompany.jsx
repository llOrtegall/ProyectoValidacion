export function CambiarCompany ({ defineCompany }) {
  return (
    <>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <section className="fixed inset-0 flex items-center justify-center z-50">
        <article className='h-44 flex flex-col justify-center items-center bg-gray-400 rounded-md py-4 gap-4 px-32'>
          <p className='pr-2 text-lg font-semibold bg-yellow-400 m-4 px-2 rounded-md'>Espera Antes De Continuar !!! </p>
          <p className="text-base font-semibold">Tú cuenta se encuentra ligada a 2 Empresas</p>
          <select className='p-2 border rounded-lg' onChange={ev => defineCompany(ev.target.value)}>
            <option>Seleccione una empresa</option>
            <option value='Servired'>Servired</option>
            <option value='Multired'>Multired</option>
          </select>
        </article>
      </section>
    </>
  )
}
