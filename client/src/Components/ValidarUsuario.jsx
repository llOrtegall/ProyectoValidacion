import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export function ValidarUsuario({ user, fun }) {
  const [valida, setValida] = useState('')

  const cc = user.cedula
  const toggleComponent = fun

  useEffect(() => {
    axios.post('http://localhost:3000/getCF', { cc })
      .then(data => {
        setValida(data.data)
      })
      .catch(data => {
        if (data.response && data.response.status === 404) {
          setValida(data.response.data)
        }
      })
  }, [cc])

  return (
    valida.Estado === 'Si Existe'
      ? (<>
        <td className="bg-green-400">
          {valida.Estado}
        </td>
        <td className="bg-green-400">
          User Ok
        </td >
      </>)
      :
      (<>
        <td className="bg-red-400">{valida.Estado}</td>
        <td className="bg-yellow-300 hover: cursor-pointer hover:bg-purple-400 hover:text-white" id={valida.user} onClick={ev => toggleComponent(ev.target)}>Opc Usuario</td>
      </>)
  )
}