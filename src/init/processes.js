const Node = require('../models/node')
const pm = require('../services/process-manager')

async function startEnabledNodes () {
  const nodes = await Node.findAll({ where: { enabled: true } })
  await pm.startProcess({ name: 'cow' })
  for (let i = 0, node = nodes[i]; i < nodes.length; ++i) {
    await pm.startProcess({ name: `${node.id}` })
  }
  await pm.listProcesses()
}

module.exports = {
  startEnabledNodes
}
