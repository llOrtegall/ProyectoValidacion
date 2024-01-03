import { Router } from 'express'
import { createBodega, getBodegaSucursal, getBodegas, findBodegaWithItems, addItemToBodega } from '../Controllers/Bodegas.Controllers.js'

export const BodegasMongoDB = Router()

BodegasMongoDB.post('/createBodega', createBodega)

BodegasMongoDB.get('/getBodegas', getBodegas)

BodegasMongoDB.get('/getBodega/:sucursal', getBodegaSucursal)

BodegasMongoDB.get('/findBodegaWithItems', findBodegaWithItems)

BodegasMongoDB.post('/addItemsToBodega', addItemToBodega)
