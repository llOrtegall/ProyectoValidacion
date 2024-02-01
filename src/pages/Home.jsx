import { CambiarCompany } from '../components/CambiarCompany'

export function Home ({ fun, company }) {
  if (company === 'Multired y Servired' || company === undefined) {
    return <CambiarCompany defineCompany={fun} />
  }

  return (
    <>
      <section className='w-full flex flex-col h-100 overflow-auto'>
      </section>
      <section className="flex flex-col items-center justify-center h-[93vh] overflow-auto  bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <h1 className="text-5xl font-bold mb-4">¡Bienvenido!</h1>
        <p className="text-xl text-center max-w-md">Estamos encantados de verte aquí. Explora y disfruta de todas las funcionalidades que tenemos para ti.</p>
      </section>
    </>

  )
}
