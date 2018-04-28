const debug = require('debug')('shadow-dashboard:server')
const sequelize = require('../init/sequelize')
const umzug = require('../init/umzug')
const app = require('../init/app')
const cow = require('../init/cow')
const nodes = require('../init/nodes')

async function postServe () {
  await cow.start()
  await nodes.startEnabledNodes()
}

Promise.resolve().then(() => {
  return sequelize.getAuthenticatedInstance()
}).then(seq => {
  return umzug.migrate(seq)
}).then(() => {
  return app.serve()
}).then(() => {
  debug('Listening on ' + '127.0.0.1:4566')
  // Start tasks whose failures shouldn't stop the server
  return postServe().catch(err => console.info(`postServe encounters error: ${err}`))
})
