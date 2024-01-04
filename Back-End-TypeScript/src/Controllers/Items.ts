import { inserItemSer, getItemsSer, getItemSer, updateItemSer, deleteItemSer } from "../Services/ItemService"
import { handleHttp } from '../utils/Error.handle'
import { Request, Response } from "express"

export const getItem = async ({ params }: Request, res: Response) => {
  try {
    const { placa } = params
    const response = await getItemSer(placa)
    if(!response) return res.status(404).json({ error: 'Item No Encontrado', placa: placa})
    res.status(200).json(response)
  } catch (error) {
    handleHttp(res, 'Error getting item', error)
  }
}

export const getItems = async (req: Request, res: Response) => {
  try {
    const responseItems = await getItemsSer();
    res.status(200).json({ Items: responseItems })
  } catch (error) {
    handleHttp(res, 'Error getting items', error)
  }
}

export const createItem = async ({ body }: Request, res: Response) => {
  const { nombre, descripcion, placa, serial, estado } = body

  if (!nombre || !descripcion || !placa || !serial || !estado) {
    return res.status(400).json({
      error: 'Faltan Datos Requeridos'
    })
  }

  try {
    const responseItem = await inserItemSer(body)
    if (responseItem && responseItem._id) {
      return res.status(201).json({
        message: 'Item Creado Correctamente',
      })
    }
  } catch (error) {
    handleHttp(res, 'Error creating item', error)
  }
}

export const updateItem = async ({ params, body }: Request, res: Response) => {
  try {
    const { placa } = params
    const responseItem = await updateItemSer(placa, body)
    if(!responseItem) return res.status(404).json({ error: 'Item No Encontrado', placa: placa})
    res.status(200).json({
      message: 'Item Actualizado Correctamente',
      item: responseItem
    })
  } catch (error) {
    handleHttp(res, 'Error update item', error)
  }
}

export const deleteItem = async ({ params }: Request, res: Response) => {
  try {
    const { placa } = params
    const responseItem = await deleteItemSer(placa)
    if(!responseItem) return res.status(404).json({ error: 'Item No Encontrado', placa: placa})
    res.status(200).json({
      message: 'Item Eliminado Correctamente',
      item: responseItem
    })
  } catch (error) {
    handleHttp(res, 'Error delete item', error)
  }
}
