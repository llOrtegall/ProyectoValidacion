import { conecOracDB } from '../db.js'

export const userCreated = async (req, res) => {

  const ccConsultar = req.body

  const ccprop = ccConsultar.prop


  // TODO: Esta es la data desde Chat Boot
  const result2 = await conecOracDB.execute(`select * from gamble.clientes where documento=${ccprop}`);

  if (result2.rows.length === 0) {
    res.status(200).json('user no created')
  } else {
    res.status(202).json('user created')
  }

}