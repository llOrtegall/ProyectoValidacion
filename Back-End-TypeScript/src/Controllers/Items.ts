import { Request, Response } from "express"
import { handleHttp } from '../utils/Error.handle'
import { inserItemSer, getItemsSer, getItemSer } from "../Services/ItemService"

const getItem = async ({params}: Request, res: Response) => {
  try {
    const { placa } = params
    const response = await getItemSer(placa)
    res.status(200).json(response)
  } catch (error) {
    handleHttp(res, 'Error getting item', error)
  }
}

const getItems = async (req: Request, res: Response) => {
  try {
    const responseItems = await getItemsSer();
    res.status(200).json(responseItems)
  } catch (error) {
    handleHttp(res, 'Error getting items', error)
  }
}

const createItem = async ({ body }: Request, res: Response) => {
  try {
    const responseItem = await inserItemSer(body)
    res.send(body)
  } catch (error) {
    handleHttp(res, 'Error creating item', error)
  }
}

const updateItem = (req: Request, res: Response) => {
  try {

  } catch (error) {
    handleHttp(res, 'Error update item')
  }
}

const deleteItem = (req: Request, res: Response) => {
  try {

  } catch (error) {
    handleHttp(res, 'Error delete item')
  }
}

export { getItem, getItems, createItem, updateItem, deleteItem };