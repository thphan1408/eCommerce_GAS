'use strict'

import mongoose from 'mongoose'
import os from 'os' // package of nodejs
import process from 'process' // package of nodejs

// Count connection
const countConnect = () => {
  const numConnection = mongoose.connections.length
  console.log(`Number of connections: ${numConnection}`)
}

const _SECONDS = 5000
// Check overload
const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length
    const numCores = os.cpus().length
    const memoryUsage = process.memoryUsage().rss

    // example: maximum number of connections based on number osf cores
    const maxConnection = numCores * 5

    console.log(`Active connection: ${numConnection}`)
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`)

    if (numConnection > maxConnection) {
      console.log(`Connection overload detected: ${numConnection} connections`)
      // notify.send('Connection overload detected')
    }
  }, _SECONDS) // Monitor every 5 seconds
}

export { countConnect, checkOverload }
