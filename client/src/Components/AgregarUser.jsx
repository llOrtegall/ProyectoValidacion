export function AgregarUser({ user }) {

  const SchemaUser = {
    "documento": `${user}`
  }

  const getClient = async () => {
    try {
      const url = 'http://localhost:3000/cliente';
      const opciones = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(SchemaUser)
      };
      const response = await fetch(url, opciones);
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const responseData = await response.json();
      console.log('Respuesta del servidor:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  getClient()
  console.log(getClient())
  return (
    <button className='ml-3 px-1 bg-white rounded p-1 '>Crear Cliente</button>
  )
}