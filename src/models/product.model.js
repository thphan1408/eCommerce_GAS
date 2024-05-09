'use strict'

import { Schema, model } from 'mongoose' // Erase if already required

const DOCUMENT_NAME = 'product'
const COLLECTION_NAME = 'products'

// Declare the Schema of the Mongo model
const productSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },

    product_thumb: {
      type: String,
      required: true,
    },
    product_description: String,
    product_price: {
      type: Number,
      required: true,
    },
    product_quantity: {
      type: Number,
      required: true,
    },
    product_type: {
      type: String,
      required: true,
      enum: ['Electronics', 'Clothing', 'Furniture'],
    },
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    product_attributes: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  },
)

// define the product type = clothing
const clothingSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    size: String,
    material: String,
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
  },
  {
    collection: 'clothing',
    timestamps: true,
  },
)

const electronicSchema = new Schema(
  {
    manufacturer: {
      type: String,
      required: true,
    },
    model: String,
    color: String,
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
  },
  {
    collection: 'electronics',
    timestamps: true,
  },
)

const furnitureSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    size: String,
    material: String,
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
  },
  {
    collection: 'furniture',
    timestamps: true,
  },
)

//Export the models
export const product = model(DOCUMENT_NAME, productSchema)
export const clothing = model('clothing', clothingSchema)
export const electronics = model('electronics', electronicSchema)
export const furniture = model('furniture', furnitureSchema)
