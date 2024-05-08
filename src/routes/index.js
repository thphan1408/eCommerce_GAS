'use strict'

import express from 'express'
import accessRouter from './access/index.js'
import accessProductRouter from './product/index.js'
import { apiKey, permission } from '../auth/checkAuth.js'

const router = express.Router()

// check apikey
router.use(apiKey)

// check permission
router.use(permission('0000'))

router.use('/v1/api', accessRouter)
router.use('/v1/api/product', accessProductRouter)

export default router
