const Node = require('../models/node')
const Cow = require('../models/cow')

async function startEnabledNodes () {
  const nodes = await Node.findAll({ where: { enabled: true } })
  for (let node of nodes) {
    await node.start()
    await Cow.addProxy(node.getProxy())
  }
}

module.exports = {
  startEnabledNodes
}
