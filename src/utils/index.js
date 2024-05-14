'use strict'

import _ from 'lodash'

const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields)
}

// Chuyển đổi dữ liệu từ array sang object vd: ['a', 'b'] => {a: 1, b: 1}
const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((item) => [item, 1]))
}

// Chuyển đổi dữ liệu từ array sang object vd: ['a', 'b'] => {a: 0, b: 0}
const unSelectData = (select = []) => {
  return Object.fromEntries(select.map((item) => [item, 0]))
}

// xóa các giá trị null, undefined, empty string trong object
const removeUndefinedObject = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] == null) {
      delete obj[key]
    }
  })

  return obj
}

// hàm đệ quy
const updateNestedObjectParser = (obj) => {
  // console.log('[1] obj::', obj)
  const final = {}
  Object.keys(obj).forEach((keys) => {
    console.log("keys [3]::", keys)
    if (typeof obj[keys] === 'object' && !Array.isArray(obj[keys])) {
      const response = updateNestedObjectParser(obj[keys])
      Object.keys(response).forEach((key) => {
        console.log("key [4]::", key)
        final[`${keys}.${key}`] = response[key]
      })
    } else {
      final[keys] = obj[keys]
    }
  })

  // console.log('[2] final::', final)

  return final
}

export {
  getInfoData,
  getSelectData,
  unSelectData,
  removeUndefinedObject,
  updateNestedObjectParser,
}
