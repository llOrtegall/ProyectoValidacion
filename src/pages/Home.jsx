import { useEffect, useState } from 'react'
import { CambiarCompany } from '../components/CambiarCompany'

export function Home ({ fun, company }) {
  const defineCompany = fun
  const [key, setKey] = useState(0) // Agrega un estado para la clave

  useEffect(() => {
    // Cuando company cambia, actualiza la clave para forzar una nueva renderización de CambiarCompany
    setKey(prevKey => prevKey + 1)
  }, [company])

  return (
    <main className="bg-blue-800 min-h-[93vh] flex items-center justify-center flex-col">
      {
        company === 'Multired y Servired' || company === undefined
          ? company !== 'Multired' || company !== 'Servired' || company !== undefined
            ? <CambiarCompany key={key} defineCompany={defineCompany} /> // Agrega la clave al componente CambiarCompany
            : null
          : null
      }
      <h1 className="text-4xl font-bold text-white">¡Bienvenido!</h1>
      <p className="mt-4 text-lg text-white">Estamos encantados de verte aquí. Explora y disfruta de todas las funcionalidades que tenemos para ti.</p>
    </main>
  )
}
