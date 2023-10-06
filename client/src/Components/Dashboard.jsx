import { RenderUsuarios } from './RenderUsuarios.jsx';
import { ValidarCedulas } from './ValidarCedulas.jsx';

// eslint-disable-next-line react/prop-types
export function Dashboard({ id, nombre, apellidos }) {

  return (
    <section>

      <nav className="flex items-center justify-between bg-slate-300 m-2 px-4 py-2 rounded-xl">
        <figure className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <div>
            <h3 className="font-semibold text-xl">Bienvenido {nombre} {apellidos}</h3>
            <p style={{ fontSize: '10px' }}>{id}</p>
          </div>
        </figure>

        <button id="close session" className="flex flex-col items-center text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          <p>Cerrar Session</p>
        </button>

      </nav >

      <main className="flex gap-2 px-2">

        <section className='w-1/2'>
          <h3 className='p-2 font-semibold text-2xl text-center bg-lime-300 rounded-lg my-2'>Usuarios Registrados Por ChatBoot</h3>
          <table className='p-2 rounded-xl w-full'>

            <thead>
              <tr>
                <th className='th-td text-sm'>Nombres</th>
                <th className='th-td text-sm'>Cedula</th>
                <th className='th-td text-sm'>Correo</th>
                <th className='th-td text-sm'>Télefono</th>
              </tr>
            </thead>
            <tbody >
              <RenderUsuarios />
            </tbody>
          </table>

        </section>

        <section className='w-1/2'>
          <h3 className='p-2 font-semibold text-2xl text-center bg-lime-300 rounded-lg my-2'>Validación Usuarios</h3>
          <table className='p-2 rounded-xl w-full'>
            <thead>
              <tr >
                <th className='th-td text-sm'>Creado Cliente Fiel</th>
                <th className='th-td text-sm'>Validado Dian</th>
                <th className='th-td text-sm'>Editar Cliente</th>
                <th className='th-td text-sm'>Eliminar Cliente</th>
                {/* Agrega más encabezados aquí si es necesario */}
              </tr>
            </thead>
            <tbody>
              <ValidarCedulas />
            </tbody>
          </table>
        </section >

      </main >
    </section >
  )
}