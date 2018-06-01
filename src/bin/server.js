const debug = require('debug')('shadow-dashboard:server')
const sequelize = require('../init/sequelize')
const umzug = require('../init/umzug')
const jsonConfig = require('../init/json-config')
const app = require('../init/app')
const nodes = require('../init/nodes')
const cow = require('../init/cow')

async function postServe () {
  await nodes.startEnabledNodes()
  await cow.start()
}

const port = Number(process.env.PORT || '4566')

Promise.resolve().then(() => {
  return sequelize.getAuthenticatedInstance()
}).then(seq => {
  return umzug.migrate(seq)
}).then(() => {
  return jsonConfig.loadJsonConfigs()
}).then(() => {
  return app.serve(port)
}).then(() => {
  debug(`Listening on 127.0.0.1:${port}`)
  // Start tasks whose failures shouldn't stop the server
  return postServe().catch(err => console.info(`postServe encounters error: ${err}`))
})
