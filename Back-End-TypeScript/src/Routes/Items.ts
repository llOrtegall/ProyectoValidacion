import { Router } from 'express'
import { createItem, deleteItem, getItem, getItems, updateItem } from '../Controllers/Items'

const router = Router();

router.get('/:placa', (getItem))

router.get('/', (getItems))

router.post('/', (createItem))

router.put('/:id', (updateItem))

router.delete('/:id', (deleteItem))

export { router }