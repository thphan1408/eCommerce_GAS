'use strict'

import {
  product,
  clothing,
  electronics,
  furniture,
} from '../models/product.model.js'
import { BadRequestError } from '../core/error.response.js'
import {
  findAllDraftForShop,
  findAllPublishForShop,
  publishProductByShop,
  searchProductByUser,
  unPublishProductByShop,
} from '../models/repositories/product.repo.js'

class ProductFactory {
  /**
   * @param {String} type [clothing, electronics, ...]
   * @param {Object} payload
   */
  static productRegistry = {} // key-value pair of product type and class reference

  // register product type
  static registerProductType(type, classRef) {
    ProductFactory.productRegistry[type] = classRef
  }

  static async createProduct(type, payload) {
    const productClass = ProductFactory.productRegistry[type]
    if (!productClass) throw new BadRequestError(`Invalid product type ${type}`)
    return new productClass(payload).createProduct()
  }

  // PUT //
  static async publishProductByShop({ product_shop, product_id }) {
    return await publishProductByShop({ product_shop, product_id })
  }

  static async unPublishProductByShop({ product_shop, product_id }) {
    return await unPublishProductByShop({ product_shop, product_id })
  }
  // END PUT //

  // query product isDraft
  static async findAllDraftForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isDraft: true }
    return await findAllDraftForShop({ query, limit, skip })
  }
  // query product isPublished
  static async findAllPublishForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isPublished: true }
    return await findAllPublishForShop({ query, limit, skip })
  }

  // query search
  static async searchProducts({ keySearch }) {
    return await searchProductByUser({ keySearch })
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

class Furnitures extends Product {
  async createProduct() {
    const newFurnitures = await furniture.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    })
    if (!newFurnitures) throw new BadRequestError('Electronic not created')

    const newProduct = await super.createProduct(newFurnitures._id)
    if (!newProduct) throw new BadRequestError('Product not created')

    return newProduct
  }
}

// register product type
ProductFactory.registerProductType('Electronic', Electronics)
ProductFactory.registerProductType('Clothing', Clothing)
ProductFactory.registerProductType('Furniture', Furnitures)

export default ProductFactory
