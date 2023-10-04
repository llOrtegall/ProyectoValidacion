import { connection, conecOracDB } from '../db.js'

export const getValidacion = async (req, res) => {


  // TODO: Esta es la data desde Chat Boot
  const [result] = await connection.query('SELECT * FROM personayumbo') // TODO: CHAT BOOT
  const resultCedula1 = result.map(item => item.cedula)


  // TODO: Esta es la data desde Chat Boot
  const result2 = await conecOracDB.execute(`select * from gamble.clientes where documento=29974550`);
  await conecOracDB.close();   // Always close connections

  console.log(resultCedula1);
  const datos = result2.rows

  const documento = datos[0][0]
  const primerNombre = datos[0][4]; //
  const primerApellido = datos[0][5]; // 
  const segundoApellido = datos[0][6]; // 

  console.log(`Documento: ${documento}, Nombre: ${primerNombre} ${primerApellido} ${segundoApellido}`);

}