const path = require('path')
const pm = require('../base/process-manager')
const JsonConfig = require('../base/json-config')
const writeFileQuietly = require('../utils/write-file-quietly')

class Cow {
  constructor (name, rc) {
    this.name = name
    this.rc = rc
    this.jsonConfig = new JsonConfig(this.name, {
      enabled: true,
      executablePath: '/usr/bin/cow',
      listen: 'http://127.0.0.1:8123',
      loadBalance: 'hash'
    }, {
      started: false,
      proxies: []
    })
  }

  async saveToRc () {
    // Construct config file content
    let data = ''
    // listen
    data += `listen = ${this.jsonConfig.file.listen}\n`
    // TODO: logFile
    // TODO: alwaysProxy
    // loadBalance
    data += `loadBalance = ${this.jsonConfig.file.loadBalance}\n`
    // Get all proxies
    for (let proxy of this.jsonConfig.memory.proxies) {
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

  async start (force) {
    if (!this.jsonConfig.memory.started) {
      await this.saveToRc()
      await pm.startProcess({
        name: this.name,
        cmd: `${this.jsonConfig.file.executablePath} -rc '${this.rc}'`
      }, force)
      this.jsonConfig.memory.started = true
    }
  }

  async stop () {
    if (this.jsonConfig.memory.started) {
      await pm.stopProcessByName(this.name)
      this.jsonConfig.memory.started = false
    }
  }

  async restart () {
    await this.stop()
    await this.start(true)
  }

  async reload () {
    if (this.jsonConfig.file.enabled) {
      await this.restart()
    } else {
      await this.stop()
    }
  }
}

const processName = 'cow'
const rcPath = path.resolve(pm.getWorkingDirectoryByProcessName(processName), 'rc')
const cow = new Cow(processName, rcPath)

module.exports = cow
