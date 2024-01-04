import { getItemsWithBodegas } from '../Controllers/ItemsControllers'
import { Router } from 'express'

export const router = Router();

router.get('/', (getItemsWithBodegas)) // TODO: trae todos los items con bodegas