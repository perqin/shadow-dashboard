const path = require('path')
const fs = require('fs')
const pm2WithoutPromise = require('pm2')
const promisify = require('../../utils/promisify')
const mkdirs = require('../../utils/mkdirs')

const pm2 = promisify.forObject(pm2WithoutPromise)

class PM2 {
  constructor () {
    this.isConnected = false
  }

  getWorkingDirectoryByProcessName (name) {
    return path.resolve(__dirname, '../../../data/pm/pm2', name)
  }

  async connected () {
    if (!this.isConnected) {
      await pm2.connectAsync()
      this.isConnected = true
    }
  }

  async startProcess (process, force) {
    await this.connected()
    const processName = `shadow-dashboard-pm-${process.name}`
    const exist = (await this.listProcesses()).filter(p => p.name === process.name)[0]
    // Already running
    if (exist) {
      if (force) {
        console.log(`Already running: ${exist.name}, restarting...`)
        await pm2.deleteAsync(processName)
      } else {
        console.log(`Already running: ${exist.name}, return`)
        return
      }
    }
    const cwd = this.getWorkingDirectoryByProcessName(process.name)
    await mkdirs(cwd)
    const scriptFile = path.resolve(cwd, `${process.name}.sh`)
    const data = `#!/bin/bash\n${process.cmd}\n`
    await promisify.forFunc(fs.writeFile)(scriptFile, data)
    await pm2.startAsync({
      name: processName,
      script: `${scriptFile}`,
      cwd: cwd,
      interpreter: 'bash'
    })
  }

  async stopProcessByName (name) {
    const exist = (await this.listProcesses()).filter(p => p.name === name)[0]
    if (exist) {
      await pm2.deleteAsync(`shadow-dashboard-pm-${name}`)
    }
  }

  async listProcesses () {
    await this.connected()
    const pm2Processes = await pm2.listAsync()
    console.log(`Processes started: [${pm2Processes.map(p => p.name).join()}]`)
    return pm2Processes.filter(p => p.name.startsWith('shadow-dashboard-pm-')).map(p => ({
      name: p.name.substr('shadow-dashboard-pm-'.length)
    }))
  }
}

module.exports = PM2
