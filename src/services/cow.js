const path = require('path')
const fs = require('fs')
const Node = require('../models/node')
const pm = require('./process-manager')
const promisify = require('../utils/promisify')

const cwd = pm.getWorkingDirectoryByProcessName('cow')
const filePath = path.resolve(cwd, 'rc')

async function generateRcFile () {
  let data = ''
  // TODO: listen: config of port
  data += `listen = http://127.0.0.1:8123\n`
  // TODO: logFile
  // TODO: alwaysProxy
  // loadBalance
  data += `loadBalance = hash\n`
  // Get all nodes
  const nodes = await Node.findAll({ where: { enabled: true } })
  for (let node of nodes) {
    data += `proxy = socks5://127.0.0.1:${node.localPort}\n`
  }
  // NOTE: ssh feature is ignored
  // TODO: Authentication feature
  // TODO: httpErrorCode
  // TODO: core
  // TODO: estimateTarget
  // TODO: tunnelAllowedPort
  // TODO: dialTimeout
  // TODO: readTimeout
  // TODO: detectSSLErr
  // TODO: stat/blocked/direct files
  try {
    await promisify.forFunc(fs.access)(cwd)
  } catch (err) {
    console.log(err)
    await promisify.forFunc(fs.mkdir)(cwd)
  }
  await promisify.forFunc(fs.writeFile)(filePath, data)
}

async function start () {
  // Generate rc
  await generateRcFile()
  await pm.startProcess({
    name: 'cow',
    cmd: `/usr/bin/cow -rc '${filePath}'`
  }, true)
}

async function stop () {
  await pm.stopProcessByName('cow')
}

async function restart () {
  await stop()
  await start()
}

module.exports = {
  start,
  stop,
  restart
}
