import { Request, Response } from "express"
import { handleHttp } from '../utils/Error.handle'
import { inserItem } from "../Services/ItemService"

const getItem = (req: Request, res: Response) => {
  try {

  } catch (error) {
    handleHttp(res, 'Error getting item')
  }
}

const getItems = (req: Request, res: Response) => {
  try {

  } catch (error) {
    handleHttp(res, 'Error getting items')
  }
}

const createItem = async ({ body }: Request, res: Response) => {
  try {
    const responseItem = await inserItem(body)
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