export function Home ({ fun, company }) {
  const defineCompany = fun

  function CambiarCompany () {
    const handleChange = (e) => {
      defineCompany(e.target.value)
    }

    return (
      <>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <section className="fixed inset-0 flex items-center justify-center z-50">
          <article className='h-44 flex flex-col justify-center items-center bg-gray-400 rounded-md py-4 gap-4'>
            <h3 className='pr-2 text-lg font-semibold bg-yellow-400 m-4 px-2 rounded-md'>Antes de continuar !!! . Tú cuenta se encuentra ligada a 2 Empresas</h3>
            <select className='p-2 border rounded-lg' onChange={handleChange}>
              <option>Seleccione una empresa</option>
              <option value='Servired'>Servired</option>
              <option value='Multired'>Multired</option>
            </select>
          </article>
        </section>
      </>
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
