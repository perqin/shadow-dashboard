const http = require('http')
const app = require('../app')

function serve (port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app.callback())
    server.on('listening', () => {
      resolve()
    })
    server.on('error', err => {
      reject(err)
    })
    server.listen(port, '127.0.0.1')
  })
}

module.exports = {
  serve
}
