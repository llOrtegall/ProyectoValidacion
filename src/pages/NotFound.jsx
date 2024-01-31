import { Link } from 'react-router-dom'

export function NotFound () {
  return (
    <section className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <article className="text-center">
        <h1 className="text-6xl font-semibold text-gray-800">404</h1>
        <p className="text-gray-200 mt-4 mb-8 font-semibold">Lo sentimos, la página que buscas no se encuentra disponible.</p>
        <Link to='/bodega' className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Volver al Inicio</Link>
      </article>
    </section>
  )
}
