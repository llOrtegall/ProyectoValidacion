import { useEffect } from "react";

export function RenderUsuarios() {

  useEffect(() => {
    try {
      const apiUrl = 'http://localhost:3000/clientes'; // URL de ejemplo
      const response = fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = response.json();
      console.log(data)
    } catch (error) {
      console.error('Error:', error);
    }

  }, [])


  return (
    <div>
    </div>
  )
}