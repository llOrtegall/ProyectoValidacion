import { connection, connection2 } from '../db.js'

// function arrayToObject(array) {
//   const result = {}
//   array.forEach(item => {
//     result[item.cedula] = item
//   })
//   return result
// }

export const getValidacion = async (req, res) => {
  // TODO: Esta es la data desde Chat Boot
  const [result] = await connection.query('SELECT * FROM personayumbo')
  const [result2] = await connection2.query('SELECT * FROM cliente')

  const resultCedula1 = result.map(item => item.cedula)
  const resultCedula2 = result2.map(item => item.cedula)

  const areEqual = resultCedula1.length === resultCedula2.length && resultCedula1.every((value, index) => value === resultCedula2[index])

  console.log(areEqual)

  // Crear un nuevo array que contenga elementos que no estén en ambos arrays
  const elementosDiferentes = resultCedula1.concat(resultCedula2)
    .filter(item => !resultCedula1.includes(item) || !resultCedula2.includes(item))

  console.log(elementosDiferentes)
}
