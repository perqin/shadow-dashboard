const path = require('path')
const Umzug = require('umzug')
const Sequelize = require('sequelize')

async function migrate (sequelize) {
  await new Umzug({
    storage: 'sequelize',
    storageOptions: { sequelize: sequelize },
    migrations: {
      path: path.resolve(__dirname, 'migrations'),
      pattern: /^[0-9]{3}(-.+)?\.js$/,
      params: [
        sequelize.getQueryInterface(),
        Sequelize.DataTypes
      ]
    }
  }).up()
}

module.exports = {
  migrate
}
