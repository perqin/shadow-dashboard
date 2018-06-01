const path = require('path')
const pm = require('../base/process-manager')
const jsonStore = require('../base/json-store')
const writeFileQuietly = require('../utils/write-file-quietly')

class Config {
  constructor (name, rcPath) {
    this.rc = rcPath
    this.json = jsonStore.build(name)
    this.persisted = {
      enabled: true,
      listen: 'http://127.0.0.1:8123',
      loadBalance: 'hash'
    }
    this.memory = {
      started: false,
      proxies: []
    }
  }

  async loadFromJson () {
    const data = await this.json.load({})
    this.persisted = {...this.persisted, ...data}
  }

  async saveToJson () {
    await this.json.save(this.persisted)
  }

  addProxy (proxy) {
    const proxies = this.memory.proxies
    const exist = proxies.find(p => p === proxy)
    if (!exist) {
      proxies.push(proxy)
    }
  }

  removeProxy (proxy) {
    const proxies = this.memory.proxies
    const index = proxies.findIndex(p => p === proxy)
    if (index >= 0) {
      proxies.splice(index, 1)
    }
  }

  async saveToRc () {
    // Construct config file content
    let data = ''
    // listen
    data += `listen = ${this.persisted.listen}\n`
    // TODO: logFile
    // TODO: alwaysProxy
    // loadBalance
    data += `loadBalance = ${this.persisted.loadBalance}\n`
    // Get all proxies
    for (let proxy of this.memory.proxies) {
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
    // Generate config file
    await writeFileQuietly(this.rc, data)
  }
}

const processName = 'cow'
const rcPath = path.resolve(pm.getWorkingDirectoryByProcessName(processName), 'rc')
const config = new Config(processName, rcPath)

async function start () {
  await config.saveToRc()
  await pm.startProcess({
    name: processName,
    cmd: `/usr/bin/cow -rc '${rcPath}'`
  }, true)
  config.memory.started = true
}

async function stop () {
  await pm.stopProcessByName(processName)
  config.memory.started = false
}

async function restart () {
  await stop()
  await start()
}

async function onConfigUpdated () {
  await config.saveToJson()
  if (config.persisted.enabled && config.memory.started) {
    await restart()
  } else if (config.persisted.enabled && !config.memory.started) {
    await start()
  } else if (!config.persisted.enabled && config.memory.started) {
    await stop()
  }
}

async function loadConfig () {
  await config.loadFromJson()
  await onConfigUpdated()
}

async function addProxy (proxy) {
  config.addProxy(proxy)
  await onConfigUpdated()
}

async function removeProxy (proxy) {
  config.removeProxy(proxy)
  await onConfigUpdated()
}

function getConfig () {
  return config.persisted
}

async function updateConfig (payload) {
  config.persisted = { ...config.persisted, ...payload }
  await onConfigUpdated()
}

module.exports = {
  loadConfig,
  start,
  restart,
  stop,
  addProxy,
  removeProxy,
  getConfig,
  updateConfig
}
