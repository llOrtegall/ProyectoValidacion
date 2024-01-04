import { BodegaModel, SimcardModel } from '../Models/Models.js'
import { ConnetMongoDB } from '../Connections/mongoDb.js'

export const createSimcard = async (req, res) => {
  console.log(req.body)
  const { numero, operador, estado, serial, apn, user, pass } = req.body

  if (!numero || !operador || !estado || !serial || !apn || !user || !pass) {
    return res.status(400).json({ error: 'Faltan campos requeridos' })
  }

  if (operador !== 'Claro' && operador !== 'Movistar' && operador !== 'Tigo') {
    return res.status(400).json({ error: 'Operador no valido' })
  }

  if (estado !== 'Activa' && estado !== 'Inactiva' && estado !== 'DeBaja') {
    return res.status(400).json({ error: 'Estado no valido' })
  }

  try {
    await ConnetMongoDB()
    const simcard = new SimcardModel({ numero, operador, estado, serial, apn, user, pass })
    await simcard.save()
    res.status(201).json(simcard)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear la simcard' })
  }
}

export const getSimcards = async (req, res) => {
  try {
    await ConnetMongoDB()
    const simcards = await SimcardModel.find()
    res.status(200).json(simcards)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener las simcards' })
  }
}

export const getSimcard = async (req, res) => {

}

export const getSimcardWhitBodega = async (req, res) => {
  try {
    await ConnetMongoDB()

    const simcards = await SimcardModel.find()

    const simcardsWhitBodega = await Promise.all(simcards.map(async (item) => {
      const bodega = await BodegaModel.findOne({ items: item._id })
      return {
        simcard: item,
        nombreBodega: bodega ? bodega.nombre : 'N/A'
      }
    }))

    res.status(200).json(simcardsWhitBodega)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener los ítems y las bodegas' })
  }
}
