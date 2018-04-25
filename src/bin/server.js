const init = require('../init')
const app = require('../app')
const debug = require('debug')('shadow-dashboard:server')

init().then(() => {
  app.listen(4566, '127.0.0.1', () => {
    debug('Listening on ' + '127.0.0.1:4566')
  })
})
