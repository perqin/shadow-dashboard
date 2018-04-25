const pm2WithoutPromise = require('pm2')
const promisify = require('../../utils/promisify')

const pm2 = promisify.forObject(pm2WithoutPromise, true)

class PM2 {
  constructor () {
    this.isConnected = false
    // TODO: Remove
    this.runningProcess = []
  }

  async connected () {
    if (!this.isConnected) {
      await pm2.connect()
      this.isConnected = true
    }
  }

  async startProcess (process) {
    this.runningProcess = this.runningProcess.concat(process)
    console.log(`Processes updated, started: [${this.runningProcess.map(p => p.name).join()}]`)
  }

  async stopProcessByName (name) {
    this.runningProcess = this.runningProcess.filter(p => p.name !== name)
  }

  async listProcesses () {
    await this.connected()
    const pm2Processes = await pm2.list()
    console.log(`Processes started: [${pm2Processes.map(p => p.name).join()}]`)
    return pm2Processes.map(p => ({
      name: p.name
    }))
  }
}

module.exports = PM2
