'use strict'

import { SuccessResponse } from '../core/success.response.js'
import ProductFactory from '../services/product.service.js'
import ProductFactoryV2 from '../services/product.service.xxx.js'

class ProductController {
  createProduct = async (req, res, next) => {
    // new SuccessResponse({
    //   message: 'Create product success!',
    //   metaData: await ProductFactory.createProduct(req.body.product_type, {
    //     ...req.body,
    //     product_shop: req.user.userId,
    //   }),
    // }).send(res)

    new SuccessResponse({
      message: 'Create product success!',
      metaData: await ProductFactoryV2.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId,
      }),
    }).send(res)
  }
}

export default new ProductController()
