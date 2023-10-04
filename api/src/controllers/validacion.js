import { conecOracDB } from '../db.js'

export const userCreated = async (req, res) => {

  const ccConsultar = req.body

  // TODO: Esta es la data desde Chat Boot
  const result2 = await conecOracDB.execute(`select * from gamble.clientes where documento=${ccConsultar.documento}`);

  if (result2.rows.length === 0) {
    console.log("El array está vacío.");
    res.status(200).json('Usuario No Esta Creado En Cliente Fiel')
  } else {
    console.log("El Array No está vacío.");
    res.status(203).json('Usuario Esta Creado En Cliente Fiel')
  }
  await conecOracDB.close();

}