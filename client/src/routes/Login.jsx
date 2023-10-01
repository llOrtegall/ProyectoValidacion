import axios from 'axios';
import { useContext, useState } from "react";
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  // TODO: Para Logín
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const { setUsername } = useContext(AuthContext)
  const goTo = useNavigate()

  async function iniciarSession(ev) {
    ev.preventDefault()
    const response = await axios.post('/login', { user, password })
    if (response.status === 202) {
      setUsername(true)
      goTo("/dashboard")
    }
  }

  return (
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
    </div>

  )
}
