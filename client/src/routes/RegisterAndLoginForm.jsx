import axios from 'axios';
import { useState } from 'react';

export const RegisterAndLoginForm = () => {

  // * username, setUsername, id, setId, name, setName, lastName, setLastName

  //TODO: Para Errores Login y Registro
  // const [errorMessage, setErrorMessage] = useState('')

  // // TODO: Para Registro
  // const [names, setNames] = useState('');
  // const [lastNames, setLastNames] = useState('');
  // const [document, setDocument] = useState('');

  // TODO: Para Logín
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  // TODO: Para controlar el formulario
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('Iniciar Session')


  async function iniciarSession(ev) {
    ev.preventDefault()
    const { data } = await axios.post('/login', { user, password })
    if (data) {
      console.log(data);

    } else {
      console.log('Error al dar datos');
    }


    // try {

    // } catch (error) {
    //   if (error.response && error.response.status === 401) {
    //     const { detalle } = error.response.data
    //     setErrorMessage(`${detalle}`);
    //     setTimeout(() => {
    //       setErrorMessage('')
    //     }, 10000)

    //   } else if (error.response && error.response.status === 404) {
    //     const { detalle } = error.response.data
    //     setErrorMessage(`${detalle}`);
    //     setTimeout(() => {
    //       setErrorMessage('')
    //     }, 10000)
    //   }
    // }
  }

  // async function Registrarse(ev) {
  //   ev.preventDefault()

  //   try {
  //     const { data } = await axios.post('/register', { names, document, lastNames })
  //     const { id, username } = data;
  //     console.log(data)
  //     setUsername(username); setId(id);
  //   } catch (error) {

  //     if (error.response && error.response.status === 409) {
  //       const { detalle } = error.response.data
  //       setErrorMessage(`${detalle}`);
  //       setTimeout(() => {
  //         setErrorMessage('')
  //       }, 10000)
  //     } else {
  //       console.error('Error de registro:', error);
  //       setErrorMessage('Se produjo un error en al Iniciar Session Automaticamente.');
  //       setTimeout(() => {
  //         setErrorMessage('')
  //       }, 10000)
  //     }
  //   }

  return (
    <section className="bg-blue-200 h-screen flex flex-col items-center justify-center pb-16 text-center">
      {
        isLoginOrRegister === 'Iniciar Session' && (
          <div className='flex flex-col items-center'>
            <form className="w-72" onSubmit={iniciarSession}>
              <h1 className='text-center font-semibold pb-4 text-xl'>Iniciar Session</h1>
              <input value={user} onChange={ev => setUser(ev.target.value)} type="text" placeholder="Usuario"
                className="block w-full rounded-md  border p-2 mb-2" required={true} />
              <input value={password} onChange={ev => setPassword(ev.target.value)} type="password" placeholder="Contraseña"
                className="block w-full rounded-md border p-2 mb-2" required={true} />
              <button className="bg-blue-500 text-white block w-full rounded-md p-2 font-semibold shadow-lg">
                Iniciar Session
              </button>
            </form>
            <article>
              No Estás Registrado ?
              {isLoginOrRegister === 'Iniciar Session' && (
                <button onClick={() => setIsLoginOrRegister('Registrarse')} className='pl-2 pt-4 font-semibold'>
                  Registrarse
                </button>
              )}
            </article>
            {/* <article>
              {errorMessage
                ? <h3 className='text-red-600 font-medium'>{errorMessage}</h3>
                : null
              }
            </article> */}

          </div>
        )
      }
      {/* {
        isLoginOrRegister === 'Registrarse' && (
          <div className='flex flex-col items-center'>
            <form className="w-72">
              <h1 className='text-center font-semibold pb-4 text-xl'>Ingresa Tus Datos De Registro</h1>
              <input value={names} onChange={ev => setNames(ev.target.value)} type="text" placeholder="Nombres"
                className="block w-full rounded-md  border p-2 mb-2" required={true} />
              <input value={lastNames} onChange={ev => setLastNames(ev.target.value)} type="text" placeholder="Apellidos"
                className="block w-full rounded-md border p-2 mb-2" required={true} />
              <input value={document} onChange={ev => setDocument(ev.target.value)} type="text" placeholder="Número De Cédula / ID"
                className="block w-full rounded-md border p-2 mb-2" required={true} />
              <button className="bg-blue-500 text-white block w-full rounded-md p-2 font-semibold shadow-lg">
                Registrarse
              </button>
            </form>
            <article>
              Ya Estás Registrado ?
              {isLoginOrRegister === 'Registrarse' && (
                <button onClick={() => setIsLoginOrRegister('Iniciar Session')} className='pl-2 pt-4 font-semibold'>
                  Iniciar Session
                </button>
              )}
            </article>
            <article>
              {errorMessage
                ? <h3 className='text-red-600 font-medium'>{errorMessage}</h3>
                : null
              }
            </article>
          </div>
        )
      } */}
    </section >
  )
}