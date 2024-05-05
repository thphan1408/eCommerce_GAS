// 'use strict'
// console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
// // level 0
// // const config = {
// //   app: {
// //     port: 8080,
// //   },
// //   db: {
// //     database: 'mongodb',
// //     host: 'localhost',
// //     port: 27017,
// //     name: 'shopDev',
// //   },
// // }

// // level 1
const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 8080,
  },
  db: {
    database: process.env.DEV_DB_DATABASE || 'mongodb',
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'ShopDev',
  },
}

const production = {
  app: {
    port: process.env.PRODUCTION_APP_PORT || 5000,
  },
  db: {
    database: process.env.PRODUCTION_DB_DATABASE || 'mongodb',
    host: process.env.PRODUCTION_DB_HOST || 'localhost',
    port: process.env.PRODUCTION_DB_PORT || 27017,
    name: process.env.PRODUCTION_DB_NAME || 'shopPROD',
  },
}

const config = { dev, production }
const env = process.env.NODE_ENV || 'dev'

export default config[env]
