import { Router } from 'express';
import { createBodega, deleteBodega, getBodega, getBodegas, updateBodega } from '../Controllers/BodegaControllers';

export const router = Router()


router.get('/', (getBodegas))

router.get('/:sucursal', (getBodega))

router.post('/', (createBodega))

router.put('/:sucursal', (updateBodega))

router.delete('/:sucursal', (deleteBodega))
