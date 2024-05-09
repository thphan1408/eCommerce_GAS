'use strict'

import { product, clothing, electronics } from '../models/product.model.js'
import { BadRequestError } from '../core/error.response.js'

class ProductFactory {
  /**
   * @param {String} type [clothing, electronics, ...]
   * payload
   */
  static async createProduct(type, payload) {
    switch (type) {
      case 'Electronics':
        return new Electronics(payload).createProduct()
      case 'Clothing':
        return new Clothing(payload).createProduct()
      default:
        throw new BadRequestError(`Invalid product type ${type}`)
    }
  }
}
/**
 *  product name, product thumb, product description, product price, product quantity, product type, product shop, product attributes
 */

class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }) {
    this.product_name = product_name
    this.product_thumb = product_thumb
    this.product_description = product_description
    this.product_price = product_price
    this.product_quantity = product_quantity
    this.product_type = product_type
    this.product_shop = product_shop
    this.product_attributes = product_attributes
  }

  //   create new product
  async createProduct(product_id) {
    return await product.create({ ...this, _id: product_id })
  }
}

// define clothing and electronics class

class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create(this.product_attributes)
    if (!newClothing) throw new BadRequestError('Clothing not created')

    const newProduct = await super.createProduct()
    if (!newProduct) throw new BadRequestError('Product not created')

    return newProduct
  }
}

class Electronics extends Product {
  async createProduct() {
    const newElectronic = await electronics.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    })
    if (!newElectronic) throw new BadRequestError('Electronic not created')

    const newProduct = await super.createProduct(newElectronic._id)
    if (!newProduct) throw new BadRequestError('Product not created')

    return newProduct
  }
}

export default ProductFactory
