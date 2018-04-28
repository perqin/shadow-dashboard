const sequelize = require('../services/sequelize')

async function getAuthenticatedInstance () {
  await sequelize.authenticate()
  return sequelize
}

module.exports = {
  getAuthenticatedInstance
}
