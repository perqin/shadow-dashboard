const request = require('request-promise-native')
const Sequelize = require('sequelize')
const sequelize = require('../services/sequelize')
const cow = require('../services/cow')
const Node = require('./node')
const parser = require('../utils/ss-ssr-uri')

const DataTypes = Sequelize.DataTypes

const Subscription = sequelize.define('subscription', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.CHAR },
  newNodeEnabled: { type: DataTypes.BOOLEAN, defaultValue: false }
})

Subscription.hasMany(Node, { foreignKey: 'subscriptionId' })
Node.belongsTo(Subscription, { foreignKey: 'subscriptionId' })

Subscription.prototype.fetchNodes = async function () {
  const buffer = await request(this.url)
  const decoded = Buffer.from(buffer.toString(), 'base64').toString()
  const parsed = parser.parse(decoded)
  return parsed.map(config => Node.build({
    enabled: false,
    type: config.type,
    server: config.server,
    serverPort: config.serverPort,
    password: config.password,
    method: config.method,
    plugin: config.plugin, // Not presented yet
    obfs: config.obfs,
    obfsParam: config.obfsParam,
    protocol: config.protocol,
    protocolParam: config.protocolParam
  }))
}

Subscription.prototype.updateNodes = async function () {
  const oldNodes = await this.getNodes()
  const newNodes = await this.fetchNodes()
  for (let i = 0; i < oldNodes.length; ++i) {
    for (let j = 0; j < newNodes.length; ++j) {
      if (oldNodes[i] !== null && newNodes[j] !== null && Node.isConfigEqual(oldNodes[i], newNodes[j])) {
        oldNodes[i] = newNodes[j] = null
        break
      }
    }
  }
  const removed = oldNodes.filter(node => node !== null)
  if (removed.length > 0) {
    await this.removeNodes(removed)
    for (let node of removed) {
      await node.disable()
      await node.destroy()
    }
  }
  const added = newNodes.filter(node => node !== null)
  if (added.length > 0) {
    for (let node of added) {
      await node.save()
      if (this.newNodeEnabled) {
        await node.enable()
      }
    }
    await this.addNodes(added)
  }
  await cow.restart()
}

module.exports = Subscription
