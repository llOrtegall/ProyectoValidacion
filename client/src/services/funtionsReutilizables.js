export function separarNombre (nombre) {
  const nombreseparado = nombre.split(' ', 4)
  const nombre1 = nombreseparado[0]
  const nombre2 = nombreseparado[1]
  const apellido1 = nombreseparado[2]
  const apellido2 = nombreseparado[3]
  return { nombre1, nombre2, apellido1, apellido2 }
}
