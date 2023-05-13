import axios from "axios";
import { useEffect, useState } from "react";

export function RegistradoClienteFiel({ cc }) {

  const [valida, setValida] = useState('');

  useEffect(() => {
    axios.post('/validarUsuario', { cc })
      .then(data => {
        setValida(data);
      })

  }, [])

  const ValidaUsuario = () => {
    console.log(valida.data);

    return (
      valida.data === 'Si Existe'
        ? <td className="bg-green-400">Si</td>
        : <td className="bg-red-400">No</td>
    )
  }




  return (
    <ValidaUsuario />
  )
}