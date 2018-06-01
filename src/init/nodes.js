const Node = require('../models/node')
const Cow = require('../models/cow')
const arrayUtils = require('../utils/array-utils')

async function startEnabledNodes () {
  const nodes = await Node.findAll({ where: { enabled: true } })
  for (let node of nodes) {
    await node.start()
    arrayUtils.addIfNotExists(Cow.jsonConfig.memory.proxies, node.getProxy())
  }
}

module.exports = {
  startEnabledNodes
}
