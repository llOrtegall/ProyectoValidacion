import { Link } from 'react-router-dom'

export function NotFound () {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-semibold text-gray-700">404</h1>
        <p className="text-gray-500 mt-4 mb-8">Lo sentimos, la página que buscas no se encuentra disponible.</p>
        <Link to='/home' className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Volver al Inicio</Link>
      </div>
    </div>
  )
}
