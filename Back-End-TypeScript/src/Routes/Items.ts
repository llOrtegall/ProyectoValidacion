import { Router } from 'express'
import { createItem, deleteItem, getItem, getItems, updateItem } from '../Controllers/Items'
import { logMiddleware } from '../Middleware/log';
import { chekJwt } from '../Middleware/session';

const router = Router();

router.get('/:placa', logMiddleware, (getItem))

router.get('/', chekJwt, (getItems))

router.post('/', (createItem))

router.put('/:placa', (updateItem))

router.delete('/:placa', (deleteItem))

export { router }