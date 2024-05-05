import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import dotenv from 'dotenv'
import router from './routes/index.js'
import './dbs/init.mongodb.js'
// import { checkOverload } from './helpers/check.connect.js'

const app = express()
dotenv.config()

// init middleware
app.use(morgan('dev')) // morgan có 5 mode: combined, common, dev, short, tiny
app.use(helmet()) // helmet giúp bảo mật ứng dụng
app.use(compression()) // compression giúp nén dữ liệu trước khi gửi đi
app.use(express.json()) // parse application/json
app.use(express.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded

// init db
// checkOverload()

// init rouztes
app.use('/', router)

// handle errors

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  const statusCode = error.status || 500
  return res.status(statusCode).json({
    status: 'Error',
    code: statusCode,
    message: error.message || 'Internal Server Error',
  })
})

export default app
