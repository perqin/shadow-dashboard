const Node = require('../models/node')

async function startEnabledNodes () {
  const nodes = await Node.findAll({ where: { enabled: true } })
  for (let node of nodes) {
    await node.enable()
  }
}

module.exports = {
  startEnabledNodes
}
