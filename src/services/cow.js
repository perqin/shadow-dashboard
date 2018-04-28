const path = require('path')
const fs = require('fs')
const pm = require('./process-manager')
const promisify = require('../utils/promisify')

const filePath = path.resolve(__dirname, '../../data/cow/rc')

async function generateRcFile () {
  let data = ''
  // TODO: listen: config of port
  data += `listen = http://127.0.0.1:8132\n`
  // TODO: logFile
  // TODO: alwaysProxy
  // loadBalance
  data += `loadBalance = hash\n`
  // TODO: Get all nodes
  data += `proxy = socks5://127.0.0.1:1104\n`
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

module.exports = {
  start,
  stop
}
