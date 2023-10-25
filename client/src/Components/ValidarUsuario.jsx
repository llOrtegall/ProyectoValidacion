import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export function ValidarUsuario({ cc, funcion }) {
  const [valida, setValida] = useState('')

  const handleClick = funcion

  useEffect(() => {
    axios.post('http://localhost:3000/getCF', { cc })
      .then(data => {
        setValida(data.data)
        console.log(data.data);
      })
      .catch(data => {
        if (data.response && data.response.status === 200) {
          setValida(data.response.data)
        }
      })
  }, [cc])
  return (
    valida.stado === 'Si Existe'
      ?
      <>
        <td className="bg-green-400">{valida.stado}</td>
        <td className="bg-green-400">Ok</td>
      </> :
      <>
        <td className="bg-red-400">{valida.stado}</td>
        <td className="hover:bg-yellow-500 hover:cursor-pointer hover:text-white"
          onClick={ev => handleClick(ev)} id={valida.user}>Opc Usuario</td>
      </>
  )
}