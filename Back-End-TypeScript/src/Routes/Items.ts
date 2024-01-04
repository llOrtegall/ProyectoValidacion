import { createItem, deleteItem, getItem, getItems, updateItem } from '../Controllers/Items'
import { logMiddleware } from '../Middleware/log';
import { Router } from 'express'

export const router = Router();

router.get('/:placa', logMiddleware, (getItem))

router.get('/', (getItems))

router.post('/', (createItem))

router.put('/:placa', (updateItem))

router.delete('/:placa', (deleteItem))
