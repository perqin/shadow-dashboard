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

Node.isConfigEqual = function (a, b) {
  if (a.type !== 'ss' && a.type !== 'ssr') {
    throw new Error(`Unsupported server type: ${a.type}`)
  }
  if (b.type !== 'ss' && b.type !== 'ssr') {
    throw new Error(`Unsupported server type: ${b.type}`)
  }
  return a.type === b.type && a.server === b.server && a.serverPort === b.serverPort && a.password === b.password &&
    a.method === b.method && (a.type === 'ss' ? a.plugin === b.plugin : (a.obfs === b.obfs && a.obfsParam === b.obfsParam &&
      a.protocol === b.protocol && a.protocolParam === b.protocolParam))
}

Node.prototype.enable = async function () {
  // TODO: Allocate port and start process
  await this.update({ enabled: true })
}

Node.prototype.disable = async function () {
  // TODO: Stop process
  await this.update({ enabled: false })
}

module.exports = Node
