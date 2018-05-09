const sequelize = require('../base/sequelize')

async function getAuthenticatedInstance () {
  await sequelize.authenticate()
  return sequelize
}

module.exports = {
  getAuthenticatedInstance
}
