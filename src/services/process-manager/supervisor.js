/**
 * Deprecated.
 */

const xmlrpc = require('xmlrpc')

// Should I write a new library since `xmlrpc` is too old?
class XmlRpcClient {
  constructor (host, port, path) {
    this.client = xmlrpc.createClient({ host: host, port: port, path: path })
  }

  methodCall (method, params) {
    return new Promise((resolve, reject) => {
      this.client.methodCall(method, params, (err, value) => {
        if (err) {
          reject(err)
        } else {
          resolve(value)
        }
      })
    })
  }
}

class SupervisorApi {
  constructor (host, port, path) {
    this.api = new XmlRpcClient(host, port, path)
  }
}

class Supervisor {
  constructor () {
    this.api = new SupervisorApi('', 0, '')
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
