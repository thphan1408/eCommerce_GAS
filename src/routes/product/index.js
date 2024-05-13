'use strict'

import express from 'express'
import ProductController from '../../controllers/product.controller.js'
import asyncHandler from '../../helpers/asyncHandler.js'
import { authenticationV2 } from '../../auth/authUtils.js'

const router = express.Router()

router.get(
  '/search/:keySearch',
  asyncHandler(ProductController.getListSearchProduct),
)

// middleware Authentication
router.use(authenticationV2)
//

router.post('', asyncHandler(ProductController.createProduct))
router.post(
  '/publish/:id',
  asyncHandler(ProductController.publishProductByShop),
)
router.post(
  '/unPublish/:id',
  asyncHandler(ProductController.unPublishProductByShop),
)

// QUERY //
router.get('/drafts/all', asyncHandler(ProductController.getAllDraftForShop)) // Get all draft product for shop
router.get(
  '/published/all',
  asyncHandler(ProductController.getAllPublishedForShop),
) // Get all publish product for shop

export default router
