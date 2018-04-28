const Node = require('../models/node')
const pm = require('../services/process-manager')

async function listNodes (ctx) {
  ctx.body = await Node.findAll()
}

async function getNodeById (ctx) {
  ctx.body = await Node.findById(ctx.params.nodeId)
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

async function setNodeEnabledById (ctx) {
  const node = await Node.findById(ctx.params.nodeId)
  if (ctx.request.fields.enabled === true) {
    await node.enable()
  } else {
    await node.disable()
  }
  ctx.response.status = 200
}

module.exports = {
  listNodes,
  getNodeById,
  createNode,
  setNodeEnabledById
}
