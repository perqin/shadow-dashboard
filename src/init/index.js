/**
 * This module is called for initialization and should not called after the app starts.
 */

const umzug = require('./umzug')
const sequelize = require('../services/sequelize')
const processes = require('./processes')

async function init () {
  await umzug.migrate(sequelize)
  await sequelize.authenticate()
  await processes.startEnabledNodes()
}

module.exports = init
