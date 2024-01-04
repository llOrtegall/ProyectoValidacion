import { createItem, deleteItem, getItem, getItems, updateItem } from '../Controllers/Items'
import { Router } from 'express'

export const router = Router();

router.get('/:placa', (getItem)) // TODO: trae un solo item por placa

router.get('/', (getItems)) // TODO: trae todos los items

router.post('/', (createItem)) // TODO: crea un item

router.put('/:placa', (updateItem)) // TODO: actualiza un item por placa

router.delete('/:placa', (deleteItem)) // TODO: elimina un item por placa
