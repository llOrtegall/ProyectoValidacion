import { CambiarCompany } from '../components/CambiarCompany'

export function Home ({ fun, company }) {
  const defineCompany = fun

  return (
    <main className="bg-blue-200">
      {
        company === 'Multired y Servired' && (
          company !== 'Multired' || company !== 'Servired' || company !== undefined
            ? <CambiarCompany defineCompany={defineCompany} />
            : null)
      }
      <h1 className="">¡Bienvenido!</h1>
      <p className="">Estamos encantados de verte aquí. Explora y disfruta de todas las funcionalidades que tenemos para ti.</p>
    </main>
  )
}
