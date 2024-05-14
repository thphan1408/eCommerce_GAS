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
      message: 'Create new product success!',
      metaData: await ProductFactoryV2.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId,
      }),
    }).send(res)
  }

  updateProduct = async (req, res, next) => {
    new SuccessResponse({
      message: 'Update product success!',
      metaData: await ProductFactoryV2.updateProduct(
        req.body.product_type,
        req.params.productId,
        {
          ...req.body,
          product_shop: req.user.userId,
        },
      ),
    }).send(res)
  }

  // PUT //
  publishProductByShop = async (req, res, next) => {
    new SuccessResponse({
      message: 'Publish product by shop success!',
      metaData: await ProductFactoryV2.publishProductByShop({
        product_shop: req.user.userId,
        product_id: req.params.id,
      }),
    }).send(res)
  }

  /**
   *
   * @param {string} product_shop
   * @param {string} product_id
   * @return {JSON}
   */
  unPublishProductByShop = async (req, res, next) => {
    new SuccessResponse({
      message: 'Unpublish product by shop success!',
      metaData: await ProductFactoryV2.unPublishProductByShop({
        product_shop: req.user.userId,
        product_id: req.params.id,
      }),
    }).send(res)
  }
  // END PUT //

  // QUERY //
  /**
   * @description Get all draft product for shop
   * @param {Number} limit
   * @param {Number} skip
   * @return {JSON}
   */
  getAllDraftForShop = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get list draft product success!',
      metaData: await ProductFactoryV2.findAllDraftForShop({
        product_shop: req.user.userId,
        // limit: parseInt(req.query.limit),
        // skip: parseInt(req.query.skip),
      }),
    }).send(res)
  }

  /**
   * @description Get all publish product for shop
   * @param {Number} limit
   * @param {Number} skip
   * @return {JSON}
   */
  getAllPublishedForShop = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get list publish product success!',
      metaData: await ProductFactoryV2.findAllPublishForShop({
        product_shop: req.user.userId,
        // limit: parseInt(req.query.limit),
        // skip: parseInt(req.query.skip),
      }),
    }).send(res)
  }
  /**
   * @description Get list search product
   * @param {String} keySearch
   * @return {JSON}
   */
  getListSearchProduct = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get list search product success!',
      metaData: await ProductFactoryV2.searchProducts(req.params),
    }).send(res)
    // END QUERY //
  }

  /**
   * @description Get list all product
   * @query = { limit, sort, page, filter }
   */
  findAllProducts = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get find all products success!',
      metaData: await ProductFactoryV2.findAllProduct(req.query),
    }).send(res)
    // END QUERY //
  }

  /**
   * @description Get one product
   * @param {String} product_id
   * @return {JSON}
   */
  findOneProduct = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get find one product success!',
      metaData: await ProductFactoryV2.findOneProduct({
        product_id: req.params.product_id,
      }),
    }).send(res)
  }
}

export default new ProductController()
