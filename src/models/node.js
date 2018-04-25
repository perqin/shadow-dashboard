const Sequelize = require('sequelize')
const sequelize = require('../services/sequelize')

const DataTypes = Sequelize.DataTypes

const Node = sequelize.define('node', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
  // `ss` for Shadowsocks, `ssr` for ShadowsocksR and its derivatives
  type: { type: DataTypes.CHAR },
  server: { type: DataTypes.CHAR },
  localAddress: { type: DataTypes.CHAR, defaultValue: '127.0.0.1' },
  localPort: { type: DataTypes.INTEGER, unique: true },
  serverPort: { type: DataTypes.INTEGER },
  password: { type: DataTypes.CHAR },
  method: { type: DataTypes.CHAR },
  // Only for `ss`
  plugin: { type: DataTypes.CHAR },
  // Only for `ssr`
  obfs: { type: DataTypes.CHAR },
  obfsParam: { type: DataTypes.CHAR },
  protocol: { type: DataTypes.CHAR },
  protocolParam: { type: DataTypes.CHAR }
})

module.exports = Node
