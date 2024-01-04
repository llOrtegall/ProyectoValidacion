import { Request, Response } from "express"
import { handleHttp } from '../utils/Error.handle'
import { inserItemSer, getItemsSer, getItemSer, updateItemSer, deleteItemSer } from "../Services/ItemService"
import { JwtPayload } from "jsonwebtoken"

interface RequestExt extends Request {
  user?: string | JwtPayload
}

export const getItem = async ({ params }: Request, res: Response) => {
  try {
    const { placa } = params
    const response = await getItemSer(placa)
    res.status(200).json(response)
  } catch (error) {
    handleHttp(res, 'Error getting item', error)
  }
}

export const getItems = async (req: RequestExt, res: Response) => {
  try {
    const responseItems = await getItemsSer();
    res.status(200).json({
      data: responseItems,
      user: req?.user
    })
  } catch (error) {
    handleHttp(res, 'Error getting items', error)
  }
}

export const createItem = async ({ body }: Request, res: Response) => {
  try {
    const responseItem = await inserItemSer(body)
    res.status(201).json(responseItem)
  } catch (error) {
    handleHttp(res, 'Error creating item', error)
  }
}

export const updateItem = async ({ params, body }: Request, res: Response) => {
  console.log(params);
  console.log(body);

  try {
    const { placa } = params
    const responseItem = await updateItemSer(placa, body)
    res.status(200).json(responseItem)
  } catch (error) {
    handleHttp(res, 'Error update item', error)
  }
}

export const deleteItem = async ({ params }: Request, res: Response) => {
  console.log(params);
  try {
    const { placa } = params
    const responseItem = await deleteItemSer(placa)
    res.status(200).json(responseItem)
  } catch (error) {
    handleHttp(res, 'Error delete item', error)
  }
}
