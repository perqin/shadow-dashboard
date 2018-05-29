const pm = require('../base/process-manager')
const fs = require('fs')
const promisify = require('../utils/promisify')
const mkdirs = require('../utils/mkdirs')

class Config {
  constructor () {
    this.configLoaded = false
    // Default fields and config
    this.proxies = []
  }

  addProxy (proxy) {
    const exist = this.proxies.find(p => p === proxy)
    if (!exist) {
      this.proxies.push(proxy)
    }
  }

  removeProxy (proxy) {
    const index = this.proxies.findIndex(p => p === proxy)
    if (index >= 0) {
      this.proxies.splice(index, 1)
    }
  }

  async save (path) {
    // Construct config file content
    let data = ''
    // TODO: listen: config of port
    data += `listen = http://127.0.0.1:8123\n`
    // TODO: logFile
    // TODO: alwaysProxy
    // loadBalance
    data += `loadBalance = hash\n`
    // Get all proxies
    for (let proxy of this.proxies) {
      data += `proxy = ${proxy}\n`
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
    // Create parent directory if needed
    const dir = require('path').dirname(path)
    await mkdirs(dir)
    // Write config file
    await promisify.forFunc(fs.writeFile)(path, data)
  }
}

const config = new Config()
const processName = 'cow'
const configPath = require('path').resolve(pm.getWorkingDirectoryByProcessName(processName), 'rc')
let started = false

async function start () {
  await config.save(configPath)
  await pm.startProcess({
    name: processName,
    cmd: `/usr/bin/cow -rc '${configPath}'`
  }, true)
  started = true
}

async function stop () {
  await pm.stopProcessByName(processName)
  started = false
}

async function restart () {
  await stop()
  await start()
}

async function onConfigUpdated () {
  if (started) {
    await restart()
  }
}

async function addProxy (proxy) {
  config.addProxy(proxy)
  await onConfigUpdated()
}

async function removeProxy (proxy) {
  config.removeProxy(proxy)
  await onConfigUpdated()
}

module.exports = {
  start,
  restart,
  stop,
  addProxy,
  removeProxy
}
