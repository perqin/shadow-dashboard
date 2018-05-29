const path = require('path')
const fs = require('fs')
const Sequelize = require('sequelize')
const config = require('config')
const sequelize = require('../base/sequelize')
const pm = require('../base/process-manager')
const allocatePort = require('../utils/allocate-port')
const promisify = require('../utils/promisify')
const mkdirs = require('../utils/mkdirs')

const DataTypes = Sequelize.DataTypes
const Op = Sequelize.Op

const Node = sequelize.define('node', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
  // `ss` for Shadowsocks, `ssr` for ShadowsocksR and its derivatives
  type: { type: DataTypes.CHAR },
  server: { type: DataTypes.CHAR },
  localAddress: { type: DataTypes.CHAR, defaultValue: '127.0.0.1' },
  localPort: { type: DataTypes.INTEGER },
  serverPort: { type: DataTypes.INTEGER },
  password: { type: DataTypes.CHAR },
  method: { type: DataTypes.CHAR },
  // Only for `ss`
  plugin: { type: DataTypes.CHAR },
  // Only for `ssr`
  obfs: { type: DataTypes.CHAR },
  obfsParam: { type: DataTypes.CHAR },
  protocol: { type: DataTypes.CHAR },
  protocolParam: { type: DataTypes.CHAR },
  remarks: { type: DataTypes.CHAR }
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

Node.prototype.start = async function () {
  // Allocate port
  const nodes = await Node.findAll({ where: {
    id: { [Op.ne]: this.id },
    enabled: true
  } })
  const allocatedPorts = nodes.map(node => node.localPort)
  const min = config.get('portsRange.min')
  const max = config.get('portsRange.max')
  const localPort = allocatePort(min, max, allocatedPorts)
  await this.update({ localPort: localPort })
  // Write ss/ssr config to file
  const cwd = pm.getWorkingDirectoryByProcessName(`node-${this.id}`)
  await mkdirs(cwd)
  const configFile = path.resolve(cwd, 'config.json')
  const ssConfig = this.type === 'ss' ? {
    server: this.server,
    local_address: this.localAddress,
    local_port: this.localPort,
    server_port: this.serverPort,
    password: this.password,
    method: this.method,
    plugin: this.plugin
  } : {
    server: this.server,
    local_address: this.localAddress,
    local_port: this.localPort,
    server_port: this.serverPort,
    password: this.password,
    method: this.method,
    obfs: this.obfs,
    obfs_param: this.obfsParam,
    protocol: this.protocol,
    protocol_param: this.protocolParam
  }
  await promisify.forFunc(fs.writeFile)(configFile, JSON.stringify(ssConfig))
  // Start process
  await pm.startProcess({
    name: `node-${this.id}`,
    cmd: `/usr/bin/ssrr-local -c '${configFile}'`
  }, true)
  await this.update({ enabled: true })
}

Node.prototype.stop = async function () {
  await pm.stopProcessByName(`node-${this.id}`)
}

Node.prototype.getProxy = function () {
  return `socks5://${this.localAddress}:${this.localPort}`
}

module.exports = Node
