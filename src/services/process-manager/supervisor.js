class Supervisor {
  constructor () {
    // Mock only
    this.runningProcess = []
  }

  async startProcess (process) {
    this.runningProcess = this.runningProcess.concat(process)
    console.log(`Processes updated, started: [${this.runningProcess.map(p => p.name).join()}]`)
  }

  async stopProcessByName (name) {
    this.runningProcess = this.runningProcess.filter(p => p.name !== name)
  }

  async listProcesses () {
    return this.runningProcess
  }
}

module.exports = Supervisor
