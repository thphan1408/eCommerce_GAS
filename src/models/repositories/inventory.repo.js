import inventory from '../iventory.model.js'
import { Types } from 'mongoose'

const insertInventory = async ({
  productId,
  shopId,
  stock,
  location = 'unKnow',
}) => {
  return await inventory.create({
    inven_productId: productId,
    inven_stock: stock,
    inven_location: location,
    inven_shopId: shopId,
  })
}

export { insertInventory }
