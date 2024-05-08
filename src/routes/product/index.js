'use strict'

import express from 'express'
import ProductController from '../../controllers/product.controller.js'
import asyncHandler from '../../helpers/asyncHandler.js'
import { authenticationV2 } from '../../auth/authUtils.js'

const router = express.Router()

// middleware Authentication for logOut
router.use(authenticationV2)
//

// LogOut
router.post('/createProduct', asyncHandler(ProductController.createProduct))

export default router
