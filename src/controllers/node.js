const NodeService = require('../services/node')
const nodeService = new NodeService(require('../models/node'), require('../models/cow'))

async function getConfig (ctx) {
  ctx.body = await nodeService.getConfig()
}

async function updateConfig (ctx) {
  await nodeService.updateConfig(ctx.request.fields)
  ctx.response.status = 200
}

async function createNode (ctx) {
  ctx.body = await nodeService.createNode(ctx.request.fields)
}

async function listNodes (ctx) {
  ctx.body = await nodeService.listNodes()
}

async function getNodeById (ctx) {
  ctx.body = await nodeService.findNode(Number(ctx.params.nodeId))
}

async function updateNodeById (ctx) {
  await nodeService.updateNode(Number(ctx.params.nodeId), ctx.request.fields)
  ctx.response.status = 200
}

async function setNodeEnabledById (ctx) {
  await nodeService.updateNodeEnabled(Number(ctx.params.nodeId), ctx.request.fields.enabled)
  ctx.response.status = 200
}

async function removeNodeById (ctx) {
  await nodeService.removeNode(Number(ctx.params.nodeId))
  ctx.response.status = 200
}

module.exports = {
  getConfig,
  updateConfig,
  createNode,
  listNodes,
  getNodeById,
  updateNodeById,
  setNodeEnabledById,
  removeNodeById
}
