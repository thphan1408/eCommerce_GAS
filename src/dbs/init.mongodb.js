'use strict'

import mongoose from 'mongoose'
import { countConnect } from '../helpers/check.connect.js'
import configMongodb from '../configs/config.mongodb.js'

const { database, host, port, name } = configMongodb.db

const connectString = `${database}://${host}:${port}/${name}`

console.log('connectString:', connectString)

// Dưới đây là cách viết class singleton
class Database {
  constructor() {
    this.connect()
  }

  // connect
  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', {
        color: true,
      })
    }

    countConnect()
    mongoose
      .connect(connectString, {
        maxPoolSize: 50,
      })
      .then((_) => {
        console.log(`Connected Mongodb success PRO`, countConnect())
      })
      .catch((err) => console.log(`Error connect Mongodb`))
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
}

const intanceMongodb = Database.getInstance()

export default intanceMongodb
