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
    <main className="bg-blue-200">
      {
        company === 'Multired y Servired' || company === undefined
          ? company !== 'Multired' || company !== 'Servired' || company !== undefined
            ? <CambiarCompany key={key} defineCompany={defineCompany} /> // Agrega la clave al componente CambiarCompany
            : null
          : null
      }
      <h1 className="">¡Bienvenido!</h1>
      <p className="">Estamos encantados de verte aquí. Explora y disfruta de todas las funcionalidades que tenemos para ti.</p>
    </main>
  )
}
