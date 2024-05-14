'use strict'

import { product, electronics, clothing, furniture } from '../product.model.js'
import { Types } from 'mongoose'
import { getSelectData, unSelectData } from '../../utils/index.js'

const findAllDraftForShop = async ({ query, limit, skip }) => {
  return await queryProduct({ query, limit, skip })
}

const findAllPublishForShop = async ({ query, limit, skip }) => {
  return await queryProduct({ query, limit, skip })
}

const findAllProducts = async ({ limit, sort, page, filter, select }) => {
  const skip = (page - 1) * limit
  const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
  const products = await product
    .find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean()
    .exec()

  return products
}

const findOneProduct = async ({ product_id, unSelect }) => {
  return await product
    .findById({ _id: new Types.ObjectId(product_id) })
    .select(unSelectData(unSelect))
    .lean()
}

// Update ProductById
const updateProductById = async ({
  productId,
  bodyUpdate,
  model,
  isNew = true,
}) => {
  return await model.findByIdAndUpdate(productId, bodyUpdate, {
    new: isNew,
  })
}

/**
 * @Description search product by user
 * @param {string} keySearch
 * @returns {JSON}
 */
const searchProductByUser = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch)
  const results = await product
    .find(
      {
        isPublished: true,
        $text: { $search: regexSearch },
      },
      {
        score: {
          $meta: 'textScore',
        },
      },
    )
    .sort({ score: { $meta: 'textScore' } })
    .lean()
  return results
}

const publishProductByShop = async ({ product_shop, product_id }) => {
  const foundShop = await product.findOne({
    product_shop: new Types.ObjectId(product_shop),
    _id: new Types.ObjectId(product_id),
  })
  if (!foundShop) return null

  foundShop.isDraft = false
  foundShop.isPublished = true

  const { modifiedCount } = await foundShop.updateOne(foundShop)

  return modifiedCount
}

const unPublishProductByShop = async ({ product_shop, product_id }) => {
  const foundShop = await product.findOne({
    product_shop: new Types.ObjectId(product_shop),
    _id: new Types.ObjectId(product_id),
  })
  if (!foundShop) return null

  foundShop.isDraft = true
  foundShop.isPublished = false

  const { modifiedCount } = await foundShop.updateOne(foundShop)

  return modifiedCount
}

const queryProduct = async ({ query, limit, skip }) => {
  return await product
    .find(query)
    .populate('product_shop', 'name email -_id') // select name, email, hide _id
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean() // convert to plain object
    .exec() // đại diện cho một promise
}

export {
  findAllDraftForShop,
  publishProductByShop,
  findAllPublishForShop,
  unPublishProductByShop,
  searchProductByUser,
  findAllProducts,
  findOneProduct,
  updateProductById,
}
