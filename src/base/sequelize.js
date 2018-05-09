const Sequelize = require('sequelize')
const config = require('config')

// Singleton used by the whole app (including Umzug migration)
const sequelize = new Sequelize(config.get('storage.uri'), {
  define: {
    timestamps: false
  }
})

module.exports = sequelize
