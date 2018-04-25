const Node = require('../models/node')
const pm = require('../services/process-manager')

async function listNodes (ctx) {
  ctx.body = await Node.findAll()
}

async function createNode (ctx) {
  const node = await Node.create(ctx.request.fields)
  if (node.enabled) {
    try {
      await pm.startProcess({ name: `${node.id}` })
    } catch (err) {
      await node.update({ enabled: false })
      throw err
    }
  }
  ctx.body = node
}

module.exports = {
  listNodes,
  createNode
}
