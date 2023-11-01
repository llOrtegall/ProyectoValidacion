export function InfoUserChat ({ user }) {
  const { cedula, nombres, telefono, correo, telwhats } = user[0]

  return (
    <div>
      <h2>{nombres}</h2>
      <p>Cédula: {cedula}</p>
      <p>Teléfono: {telefono}</p>
      <p>Correo: {correo}</p>
      <p>Teléfono/WhatsApp: {telwhats}</p>
    </div>
  )
}
