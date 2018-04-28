const Node = require('../models/node')
const pm = require('../services/process-manager')

async function startEnabledNodes () {
  const nodes = await Node.findAll({ where: { enabled: true } })
  for (let node of nodes) {
    await pm.startProcess({ name: `${node.id}` })
  }
  // TODO: Just for debug
  await pm.listProcesses()
}

module.exports = {
  startEnabledNodes
}
