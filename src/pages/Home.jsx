export function Home ({ fun, company }) {
  const defineCompany = fun
  function CambiarCompany () {
    const handleChange = (e) => {
      defineCompany(e.target.value)
    }

    return (
      <div className='flex justify-center items-center bg-yellow-300 rounded-md py-1.5'>
        <h3 className='pr-2 text-lg font-semibold'>Antes De Navegar  Asegurate !!!.  Tú cuenta se encuentra ligada a 2 Empresas: </h3>
        <select className='p-2 border rounded-lg' onChange={handleChange}>
          <option>Seleccione una empresa</option>
          <option value='Servired'>Servired</option>
          <option value='Multired'>Multired</option>
        </select>
      </div>
    )
  }

  return (
    <>
      <section className='w-full flex flex-col h-100 overflow-auto'>
        {company !== 'Multired y Servired' ? null : CambiarCompany()}
      </section>
      <section className="flex flex-col items-center justify-center h-[93vh] overflow-auto  bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <h1 className="text-5xl font-bold mb-4">¡Bienvenido!</h1>
        <p className="text-xl text-center max-w-md">Estamos encantados de verte aquí. Explora y disfruta de todas las funcionalidades que tenemos para ti.</p>
      </section>
    </>

  )
}
