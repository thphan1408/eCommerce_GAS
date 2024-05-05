import app from './src/app.js'

const PORT = process.env.PORT || 5001

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// process.on('SIGINT', () => {
//   server.close(() => {
//     console.log('Server closed')
//   })
//   // notify.send(ping...)
// })
