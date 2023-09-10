import { useEffect, useState } from 'react'

// eslint-disable-next-line react/prop-types
export function Dashboard({ nombre, apellidos, id }) {

  const [userData, setUserData] = useState([]);

  console.log(userData)

  // TODO: Trae la Data desde la base de Datos De Registro
  useEffect(() => {
    // Realiza una solicitud GET utilizando el método fetch
    fetch('http://localhost:3000/clientes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        // Actualiza el estado con los datos obtenidos
        setUserData(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error de solicitud:', error);
      });
  }, []);


  // useEffect(() => {
  //   axios.get('/clientes').then(response => {
  //     setUserData(response.data)
  //     console.log(response.data);
  //   })
  // }, [])


  return (
    <section className=''>
      {/*// TODO: Aquí Estará la barra de navegación */}
      <nav className="flex items-center justify-between bg-slate-100 px-4 py-2">

        <figure className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
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

      <main className="p-2">
        <h3 className='w-1/2 p-2 font-semibold text-2xl text-center bg-cyan-200 border rounded-lg my-2'>Usuarios Registrados por ChatBoot</h3>
        <table className='w-1/2 p-2'>
          <thead>
            <tr>
              <th className='th-td'>Nombres</th>
              <th className='th-td'>Cedula</th>
              <th className='th-td'>Correo</th>
              {/* Agrega más encabezados aquí si es necesario */}
            </tr>
          </thead>
          <tbody>
            {userData.map(user => (
              <tr key={user.id}>
                <td className='th-td'>{user.nombre}</td>
                <td className='th-td'>{user.cedula}</td>
                <td className='th-td'>{user.correo}</td>
                {/* Agrega más celdas aquí si es necesario */}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </section >
  )
}