import { deleteBodegaSer, getBodegaSer, getBodegasSer, insertBodegaSer, updateBodegaSer} from '../Services/BodegaService'
import { handleHttp } from '../utils/Error.handle'
import { Request, Response } from "express"

export const getBodega = async ({ params }: Request, res: Response) => {
  try {
    const { sucursal } = params
    const response = await getBodegaSer(sucursal)
    if(!response) return res.status(404).json({ error: 'Item No Encontrado', sucursal: sucursal})
    res.status(200).json(response)
  } catch (error) {
    handleHttp(res, 'Error getting item', error)
  }
}

export const getBodegas = async (req: Request, res: Response) => {
  try {
    const responseBodegas = await getBodegasSer();
    res.status(200).json({ Bodegas: responseBodegas })
  } catch (error) {
    handleHttp(res, 'Error getting items', error)
  }
}

export const createBodega = async ({ body }: Request, res: Response) => {
  const { nombre, sucursal, direccion } = body

  if(!nombre || !sucursal || !direccion) return res.status(400).json({ error: 'Faltan Datos Para Crear Bodega' })

  try {
    const responseBodega = await insertBodegaSer(body)
    if (responseBodega && responseBodega._id) {
      return res.status(201).json({
        message: 'Bodega Creada Correctamente',
        bodega: responseBodega
      })
    }
  } catch (error) {
    handleHttp(res, 'Error creating item', error)
  }
}

export const updateBodega = async ({ params, body }: Request, res: Response) => {
  try {
    const { sucursal } = params
    const responseItem = await updateBodegaSer(sucursal, body)
    if(!responseItem) return res.status(404).json({ error: 'Bodega No Encontrada', sucursal: sucursal})
    res.status(200).json({
      message: 'Bodega Actualizada Correctamente',
      item: responseItem
    })
  } catch (error) {
    handleHttp(res, 'Error update item', error)
  }
}

export const deleteBodega = async ({ params }: Request, res: Response) => {
  try {
    const { sucursal } = params
    const responseItem = await deleteBodegaSer(sucursal)
    if(!responseItem) return res.status(404).json({ error: 'Item No Encontrado', sucursal: sucursal})
    res.status(200).json({
      message: 'Item Eliminado Correctamente',
      item: responseItem
    })
  } catch (error) {
    handleHttp(res, 'Error delete item', error)
  }
}
